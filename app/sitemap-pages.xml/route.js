import path from 'node:path';
import { getBaseUrl } from '@/lib/site-url';
import { collectStaticRoutes, buildUrlsetXml, xmlResponse } from '@/lib/sitemap-helpers';

export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();
  const appDir = path.join(process.cwd(), 'app');
  const staticRoutes = await collectStaticRoutes(appDir);

  const entries = staticRoutes.map((route) => {
    const isHome = route === '/';
    const isListing = route === '/blogs' || route === '/tour-packages' || route === '/destinations';
    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: isHome ? 'daily' : isListing ? 'daily' : 'weekly',
      priority: isHome ? '1.0' : isListing ? '0.95' : '0.8',
      image: null,
    };
  });

  return xmlResponse(buildUrlsetXml(entries));
}
