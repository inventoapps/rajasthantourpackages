import { notFound } from 'next/navigation';
import DestinationDetailPageClient from '@/components/pages/DestinationDetailPageClient';
import {
  getDestinationBySlug,
  getDestinationSlugs,
  getDestinations,
  getPackages,
  getReviews,
  getNavData,
  getSiteSettings,
} from '@/lib/public-content';
import { toAbsoluteUrl } from '@/lib/site-url';
import { buildMetadata } from '@/lib/seo-governance';

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getDestinationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dest = await getDestinationBySlug(slug);
  if (!dest) {
    return buildMetadata({
      title: 'Destination Not Found',
      description: 'The requested destination could not be found.',
      canonical: `/destinations/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: dest.meta_title || `${dest.name} Tourism - ${dest.tagline} | Travel Guide`,
    description: dest.meta_description || dest.description?.slice(0, 160),
    canonical: `/destinations/${dest.slug}`,
    image: dest.image_url,
  });
}

export default async function DestinationDetailPage({ params }) {
  const { slug } = await params;
  const dest = await getDestinationBySlug(slug);
  if (!dest) notFound();

  // Fetch related tour packages, reviews, and other data
  const [allPkgs, allDestinations, allReviews, navData, siteSettings] = await Promise.all([
    getPackages({ limit: 50 }),
    getDestinations(),
    getReviews({ limit: 6 }),
    getNavData(),
    getSiteSettings(),
  ]);

  // Filter packages that match this destination by location field
  const relatedPackages = allPkgs.filter(
    (p) => p.location && p.location.toLowerCase().includes(dest.name.toLowerCase())
  ).slice(0, 4);

  // Other destinations (exclude current)
  const otherDestinations = allDestinations.filter((d) => d.slug !== dest.slug).slice(0, 4);

  // JSON-LD schemas
  const destinationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: dest.name,
    description: dest.meta_description || dest.description,
    image: dest.image_url || undefined,
    url: toAbsoluteUrl(`/destinations/${dest.slug}`),
    touristType: 'Leisure, Adventure, Cultural',
    containedInPlace: {
      '@type': 'State',
      name: 'Rajasthan',
      containedInPlace: { '@type': 'Country', name: 'India' },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Destinations', item: toAbsoluteUrl('/destinations') },
      { '@type': 'ListItem', position: 3, name: dest.name, item: toAbsoluteUrl(`/destinations/${dest.slug}`) },
    ],
  };

  const validFaqs = Array.isArray(dest.faqs) ? dest.faqs.filter((f) => f?.question && f?.answer) : [];
  const faqSchema =
    validFaqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: validFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <DestinationDetailPageClient
        dest={dest}
        relatedPackages={relatedPackages}
        otherDestinations={otherDestinations}
        reviews={allReviews}
        navTours={navData.tours}
        navBlogs={navData.blogs}
        navDestinations={navData.destinations}
        siteSettings={siteSettings}
      />
    </>
  );
}
