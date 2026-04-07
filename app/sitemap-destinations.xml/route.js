import { getBaseUrl } from '@/lib/site-url';
import { fetchDestinationEntries, toAbsoluteImage, buildUrlsetXml, xmlResponse } from '@/lib/sitemap-helpers';

export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();
  const destinations = await fetchDestinationEntries();

  /* Destinations listing page */
  const listingEntry = {
    url: `${baseUrl}/destinations`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: '0.9',
    image: null,
  };

  /* Individual destination pages */
  const destinationEntries = destinations.map((d) => {
    const age = Math.max(0, Math.floor((Date.now() - d.lastModified.getTime()) / 86400000));
    let changeFrequency, priority;
    if (age <= 30) { changeFrequency = 'weekly'; priority = '0.85'; }
    else { changeFrequency = 'monthly'; priority = '0.8'; }

    return {
      url: `${baseUrl}/destinations/${d.slug}`,
      lastModified: d.lastModified,
      changeFrequency,
      priority,
      image: toAbsoluteImage(baseUrl, d.image),
    };
  });

  return xmlResponse(buildUrlsetXml([listingEntry, ...destinationEntries]));
}
