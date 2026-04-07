import { getBaseUrl } from '@/lib/site-url';
import { fetchBlogEntries, toAbsoluteImage, buildUrlsetXml, xmlResponse } from '@/lib/sitemap-helpers';

export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();
  const blogs = await fetchBlogEntries();

  /* Blog listing page */
  const listingEntry = {
    url: `${baseUrl}/blogs`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: '0.95',
    image: null,
  };

  /* Individual blog posts */
  const blogEntries = blogs.map((b) => {
    const age = Math.max(0, Math.floor((Date.now() - b.lastModified.getTime()) / 86400000));
    let changeFrequency, priority;
    if (age <= 7) { changeFrequency = 'daily'; priority = '0.9'; }
    else if (age <= 30) { changeFrequency = 'weekly'; priority = '0.8'; }
    else { changeFrequency = 'monthly'; priority = '0.7'; }

    return {
      url: `${baseUrl}/blogs/${b.slug}`,
      lastModified: b.lastModified,
      changeFrequency,
      priority,
      image: toAbsoluteImage(baseUrl, b.image),
    };
  });

  return xmlResponse(buildUrlsetXml([listingEntry, ...blogEntries]));
}
