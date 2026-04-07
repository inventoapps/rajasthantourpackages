import { getBaseUrl } from '@/lib/site-url';
import { escapeXml, xmlResponse } from '@/lib/sitemap-helpers';

export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();
  const now = new Date().toISOString();

  const sitemaps = [
    { loc: `${baseUrl}/sitemap-pages.xml`, lastmod: now },
    { loc: `${baseUrl}/sitemap-packages.xml`, lastmod: now },
    { loc: `${baseUrl}/sitemap-blogs.xml`, lastmod: now },
    { loc: `${baseUrl}/sitemap-destinations.xml`, lastmod: now },
  ];

  const items = sitemaps
    .map(
      (s) => `  <sitemap>
    <loc>${escapeXml(s.loc)}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</sitemapindex>`;

  return xmlResponse(xml);
}
