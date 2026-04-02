import fs from 'node:fs/promises';
import path from 'node:path';
import { supabaseAdmin } from '@/lib/supabase';
import { STATIC_BLOGS, STATIC_PACKAGES } from '@/lib/data';
import { getBaseUrl } from '@/lib/site-url';

export const revalidate = 3600;

const PAGE_FILE_RE = /^page\.(js|jsx|ts|tsx|mdx)$/;
const EXCLUDED_TOP_LEVEL = new Set(['api', 'admin']);

function isStaticSegment(segment) {
  if (!segment) return true;
  if (segment.startsWith('(') && segment.endsWith(')')) return false;
  if (segment.startsWith('[')) return false;
  if (segment.startsWith('@')) return false;
  return true;
}

function parseDate(value) {
  const d = value ? new Date(value) : null;
  return d && !Number.isNaN(d.getTime()) ? d : new Date();
}

function daysSince(date) {
  return Math.max(0, Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)));
}

function getRecencyTuning(lastModified, kind) {
  const age = daysSince(lastModified);
  if (kind === 'blog') {
    if (age <= 7) return { changeFrequency: 'daily', priority: '0.9' };
    if (age <= 30) return { changeFrequency: 'weekly', priority: '0.8' };
    return { changeFrequency: 'monthly', priority: '0.7' };
  }
  if (kind === 'package') {
    if (age <= 7) return { changeFrequency: 'daily', priority: '0.95' };
    if (age <= 30) return { changeFrequency: 'weekly', priority: '0.9' };
    return { changeFrequency: 'weekly', priority: '0.85' };
  }
  if (age <= 30) return { changeFrequency: 'weekly', priority: '0.8' };
  return { changeFrequency: 'monthly', priority: '0.7' };
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function collectStaticRoutes(dir, segments = [], out = []) {
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

async function getDynamicBlogUrls() {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('slug,updated_at,created_at,is_published,image_url')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      return data
        .filter((b) => b.slug)
        .map((b) => ({
          url: `/blogs/${b.slug}`,
          lastModified: parseDate(b.updated_at || b.created_at),
          image: b.image_url || null,
          kind: 'blog',
        }));
    }
  }

  return STATIC_BLOGS.filter((b) => b.is_published && b.slug).map((b) => ({
    url: `/blogs/${b.slug}`,
    lastModified: parseDate(b.updated_at || b.created_at),
    image: b.image_url || null,
    kind: 'blog',
  }));
}

async function getDynamicPackageUrls() {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('tour_packages')
      .select('slug,updated_at,created_at,is_active,image_url')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      return data
        .filter((p) => p.slug)
        .map((p) => ({
          url: `/tour-packages/${p.slug}`,
          lastModified: parseDate(p.updated_at || p.created_at),
          image: p.image_url || null,
          kind: 'package',
        }));
    }
  }

  return STATIC_PACKAGES.filter((p) => p.is_active && p.slug).map((p) => ({
    url: `/tour-packages/${p.slug}`,
    lastModified: new Date(),
    image: p.image_url || null,
    kind: 'package',
  }));
}

function toAbsolute(baseUrl, maybeRelative) {
  if (!maybeRelative) return null;
  if (/^https?:\/\//i.test(maybeRelative)) return maybeRelative;
  return `${baseUrl}${maybeRelative.startsWith('/') ? '' : '/'}${maybeRelative}`;
}

export async function GET() {
  const baseUrl = getBaseUrl();
  const appDir = path.join(process.cwd(), 'app');
  const staticRoutes = await collectStaticRoutes(appDir);
  const dynamicUrls = [...(await getDynamicBlogUrls()), ...(await getDynamicPackageUrls())];

  const staticEntries = staticRoutes.map((route) => {
    const isHome = route === '/';
    const isListing = route === '/blogs' || route === '/tour-packages';
    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: isHome ? 'daily' : isListing ? 'daily' : 'weekly',
      priority: isHome ? '1.0' : isListing ? '0.95' : '0.8',
      image: null,
    };
  });

  const dynamicEntries = dynamicUrls.map((entry) => {
    const tune = getRecencyTuning(entry.lastModified, entry.kind);
    return {
      url: `${baseUrl}${entry.url}`,
      lastModified: entry.lastModified,
      changeFrequency: tune.changeFrequency,
      priority: tune.priority,
      image: toAbsolute(baseUrl, entry.image),
    };
  });

  const deduped = new Map();
  for (const item of [...staticEntries, ...dynamicEntries]) deduped.set(item.url, item);
  const urls = Array.from(deduped.values());

  const xmlItems = urls
    .map((item) => {
      const imageTag = item.image
        ? `<image:image><image:loc>${escapeXml(item.image)}</image:loc></image:image>`
        : '';
      return `<url>
  <loc>${escapeXml(item.url)}</loc>
  <lastmod>${item.lastModified.toISOString()}</lastmod>
  <changefreq>${item.changeFrequency}</changefreq>
  <priority>${item.priority}</priority>
  ${imageTag}
</url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlItems}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
