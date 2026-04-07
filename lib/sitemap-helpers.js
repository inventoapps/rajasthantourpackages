import { supabaseAdmin } from '@/lib/supabase';
import { STATIC_BLOGS, STATIC_PACKAGES } from '@/lib/data';
import { getBaseUrl } from '@/lib/site-url';
import fs from 'node:fs/promises';
import path from 'node:path';

/* ───── Shared helpers ───── */

const PAGE_FILE_RE = /^page\.(js|jsx|ts|tsx|mdx)$/;
const EXCLUDED_TOP_LEVEL = new Set(['api', 'admin', 'sitemap.xml', 'sitemap-pages.xml', 'sitemap-packages.xml', 'sitemap-blogs.xml', 'sitemap-destinations.xml']);

export function parseDate(value) {
  const d = value ? new Date(value) : null;
  return d && !Number.isNaN(d.getTime()) ? d : new Date();
}

export function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function toAbsoluteImage(baseUrl, maybeRelative) {
  if (!maybeRelative) return null;
  if (/^https?:\/\//i.test(maybeRelative)) return maybeRelative;
  return `${baseUrl}${maybeRelative.startsWith('/') ? '' : '/'}${maybeRelative}`;
}

/** Build a full <urlset> XML string from an array of URL entries */
export function buildUrlsetXml(entries) {
  const xmlItems = entries
    .map((item) => {
      const imageTag = item.image
        ? `\n  <image:image><image:loc>${escapeXml(item.image)}</image:loc></image:image>`
        : '';
      return `<url>
  <loc>${escapeXml(item.url)}</loc>
  <lastmod>${item.lastModified.toISOString()}</lastmod>
  <changefreq>${item.changeFrequency}</changefreq>
  <priority>${item.priority}</priority>${imageTag}
</url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlItems}
</urlset>`;
}

/** Standard XML response */
export function xmlResponse(xml) {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

/* ───── Static route discovery ───── */

function isStaticSegment(segment) {
  if (!segment) return true;
  if (segment.startsWith('(') && segment.endsWith(')')) return false;
  if (segment.startsWith('[')) return false;
  if (segment.startsWith('@')) return false;
  return true;
}

export async function collectStaticRoutes(dir, segments = [], out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile()).map((e) => e.name);
  const hasPage = files.some((f) => PAGE_FILE_RE.test(f));

  if (hasPage) {
    const route = segments.length ? `/${segments.join('/')}` : '/';
    out.push(route);
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('_')) continue;
    if (segments.length === 0 && EXCLUDED_TOP_LEVEL.has(entry.name)) continue;

    const includeSegment = isStaticSegment(entry.name);
    const nextSegments = includeSegment ? [...segments, entry.name] : [...segments];
    await collectStaticRoutes(path.join(dir, entry.name), nextSegments, out);
  }

  return out;
}

/* ───── Dynamic data fetchers ───── */

export async function fetchBlogEntries() {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('slug,updated_at,created_at,is_published,image_url')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      return data.filter((b) => b.slug).map((b) => ({
        slug: b.slug,
        lastModified: parseDate(b.updated_at || b.created_at),
        image: b.image_url || null,
      }));
    }
  }

  return STATIC_BLOGS.filter((b) => b.is_published && b.slug).map((b) => ({
    slug: b.slug,
    lastModified: parseDate(b.updated_at || b.created_at),
    image: b.image_url || null,
  }));
}

export async function fetchPackageEntries() {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('tour_packages')
      .select('slug,updated_at,created_at,is_active,image_url')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      return data.filter((p) => p.slug).map((p) => ({
        slug: p.slug,
        lastModified: parseDate(p.updated_at || p.created_at),
        image: p.image_url || null,
      }));
    }
  }

  return STATIC_PACKAGES.filter((p) => p.is_active && p.slug).map((p) => ({
    slug: p.slug,
    lastModified: new Date(),
    image: p.image_url || null,
  }));
}

export async function fetchDestinationEntries() {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('destinations')
      .select('slug,updated_at,created_at,is_active,image_url')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (!error && Array.isArray(data)) {
      return data.filter((d) => d.slug).map((d) => ({
        slug: d.slug,
        lastModified: parseDate(d.updated_at || d.created_at),
        image: d.image_url || null,
      }));
    }
  }

  return [];
}
