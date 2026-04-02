import DestinationsPageClient from '@/components/pages/DestinationsPageClient';
import { getDestinations, getNavData, getSiteSettings, getReviews } from '@/lib/public-content';
import { toAbsoluteUrl } from '@/lib/site-url';
import { buildMetadata, buildBreadcrumbSchema, buildFAQPageSchema, buildItemListSchema } from '@/lib/seo-governance';

export const revalidate = 300;

export async function generateMetadata() {
  return buildMetadata({
    title: 'Rajasthan Destinations — Top Places to Visit in Rajasthan (2025 Guide)',
    description:
      'Discover the most stunning destinations in Rajasthan — from the Pink City Jaipur to the Golden City Jaisalmer, romantic Udaipur to wild Ranthambore. Plan your perfect Rajasthan trip with expert-curated guides.',
    canonical: '/destinations',
    keywords:
      'Rajasthan destinations, places to visit in Rajasthan, Jaipur, Udaipur, Jaisalmer, Jodhpur, Pushkar, Ranthambore, best places Rajasthan, Rajasthan tourism, Rajasthan travel guide',
  });
}

export default async function DestinationsPage() {
  const [destinations, navData, siteSettings, reviews] = await Promise.all([
    getDestinations(),
    getNavData(),
    getSiteSettings(),
    getReviews(),
  ]);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: toAbsoluteUrl('/') },
    { name: 'Destinations', url: toAbsoluteUrl('/destinations') },
  ]);

  const faqSchema = buildFAQPageSchema([
    { question: 'What are the most popular destinations in Rajasthan?', answer: 'The most popular destinations in Rajasthan include Jaipur (Pink City), Udaipur (City of Lakes), Jaisalmer (Golden City), Jodhpur (Blue City), Pushkar (Sacred City), and Ranthambore (Tiger Territory). Each offers a unique blend of history, culture, and adventure.' },
    { question: 'What is the best time to visit Rajasthan?', answer: 'October to March is the best time to visit Rajasthan. The weather is pleasant (15–25°C), perfect for sightseeing and outdoor activities. November to February is peak season.' },
    { question: 'How many days are enough for a Rajasthan trip?', answer: 'A minimum of 5–7 days is recommended to cover 3–4 major destinations. For a comprehensive tour covering Jaipur, Jodhpur, Jaisalmer, and Udaipur, plan for 8–10 days.' },
    { question: 'Is Rajasthan safe for solo travelers and women?', answer: 'Yes, Rajasthan is generally safe for solo travelers and women. Tourist areas are well-policed. Standard travel precautions, booking guided tours for remote areas, and choosing reputed accommodations are recommended.' },
    { question: 'Which destination in Rajasthan is best for couples?', answer: "Udaipur is considered the most romantic destination in Rajasthan, with its beautiful lakes, palace hotels, and sunset boat rides. Jaisalmer's desert camping under the stars is also incredibly romantic." },
  ]);

  const itemListSchema = buildItemListSchema(
    'Top Destinations in Rajasthan',
    destinations.map((dest) => ({ name: dest.name, url: toAbsoluteUrl(`/destinations/${dest.slug}`) }))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <DestinationsPageClient
        destinations={destinations}
        reviews={reviews}
        navTours={navData.tours}
        navBlogs={navData.blogs}
        navDestinations={navData.destinations}
        siteSettings={siteSettings}
      />
    </>
  );
}
