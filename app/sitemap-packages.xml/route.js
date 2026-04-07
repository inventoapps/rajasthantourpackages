import { getBaseUrl } from '@/lib/site-url';
import { fetchPackageEntries, toAbsoluteImage, buildUrlsetXml, xmlResponse } from '@/lib/sitemap-helpers';

export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();
  const packages = await fetchPackageEntries();

  /* Individual package pages */
  const packageEntries = packages.map((p) => {
    const age = Math.max(0, Math.floor((Date.now() - p.lastModified.getTime()) / 86400000));
    let changeFrequency, priority;
    if (age <= 7) { changeFrequency = 'daily'; priority = '0.95'; }
    else if (age <= 30) { changeFrequency = 'weekly'; priority = '0.9'; }
    else { changeFrequency = 'weekly'; priority = '0.85'; }

    return {
      url: `${baseUrl}/tour-packages/${p.slug}`,
      lastModified: p.lastModified,
      changeFrequency,
      priority,
      image: toAbsoluteImage(baseUrl, p.image),
    };
  });

  /* Duration category landing pages (1–10 day packages) */
  const durationEntries = Array.from({ length: 10 }, (_, i) => ({
    url: `${baseUrl}/tour-packages/${i + 1}-day-rajasthan-tour-packages`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: '0.85',
    image: null,
  }));

  return xmlResponse(buildUrlsetXml([...packageEntries, ...durationEntries]));
}
