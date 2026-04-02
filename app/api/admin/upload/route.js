import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const DEFAULT_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'featured-images';

async function ensureBucketExists(bucket) {
  const { data: buckets, error } = await supabaseAdmin.storage.listBuckets();
  if (error) throw error;
  const exists = (buckets || []).some((b) => b.name === bucket);
  if (exists) return;
  const { error: createErr } = await supabaseAdmin.storage.createBucket(bucket, { public: true });
  if (createErr) throw createErr;
}

function sanitizeFolder(input) {
  return String(input || 'misc').toLowerCase().replace(/[^a-z0-9-_]/g, '') || 'misc';
}

/**
 * Convert any text into a URL/SEO-friendly slug.
 * "Golden Triangle Tour!!" → "golden-triangle-tour"
 */
function toSeoSlug(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/['']/g, '')           // remove apostrophes
    .replace(/[^a-z0-9]+/g, '-')    // non-alphanum → hyphen
    .replace(/^-+|-+$/g, '')        // trim leading/trailing hyphens
    .slice(0, 80);                  // cap length
}

export async function POST(request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin client not configured' }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const folder = sanitizeFolder(formData.get('folder'));
    const seoName = formData.get('seoName');    // optional SEO-friendly name

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'Image file is required' }, { status: 400 });
    }

    if (!file.type?.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    await ensureBucketExists(DEFAULT_BUCKET);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.name?.includes('.') ? file.name.split('.').pop().toLowerCase() : 'jpg';

    // Build SEO-friendly filename: folder/seo-slug-timestamp.ext
    // e.g. "packages/golden-triangle-tour-1710756000.jpg"
    const slug = toSeoSlug(seoName) || toSeoSlug(file.name?.replace(/\.[^.]+$/, ''));
    const ts = Date.now();
    const filename = slug ? `${slug}-${ts}.${ext}` : `${ts}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const path = `${folder}/${filename}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(DEFAULT_BUCKET)
      .upload(path, buffer, { contentType: file.type, upsert: false });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data } = supabaseAdmin.storage.from(DEFAULT_BUCKET).getPublicUrl(path);
    return NextResponse.json({ success: true, url: data.publicUrl, path, bucket: DEFAULT_BUCKET });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
