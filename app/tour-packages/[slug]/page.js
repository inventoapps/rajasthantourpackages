import { notFound, permanentRedirect } from 'next/navigation';
import PackageDetailPageClient from '@/components/pages/PackageDetailPageClient';
import { getPackageBySlug, getPackages, getPackageSlugs, getNavData, getSiteSettings } from '@/lib/public-content';
import { toAbsoluteUrl } from '@/lib/site-url';
import { buildMetadata, resolveSlugGovernance } from '@/lib/seo-governance';
import { IMG_OG_DEFAULT } from '@/lib/image-config';

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getPackageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) {
    const governance = await resolveSlugGovernance('package', slug);
    if (governance?.type === 'redirect') {
      return buildMetadata({
        title: 'Tour Package Redirect',
        description: 'This tour package has moved to a new URL.',
        canonical: governance.destination,
        noIndex: true,
      });
    }
    if (governance?.type === 'gone') {
      return buildMetadata({
        title: 'Tour Package Removed',
        description: 'This tour package is no longer available.',
        canonical: `/tour-packages/${slug}`,
        noIndex: true,
      });
    }
    return buildMetadata({
      title: 'Package Not Found',
      description: 'The requested tour package could not be found.',
      canonical: `/tour-packages/${slug}`,
      noIndex: true,
    });
  }

  const title = pkg.meta_title || pkg.title;
  const description = pkg.meta_description || pkg.short_description || 'Rajasthan tour package details.';
  const image = pkg.image_url || IMG_OG_DEFAULT;
  const canonical = `/tour-packages/${pkg.slug}`;

  return buildMetadata({
    title,
    description,
    canonical,
    image,
    type: 'website',
  });
}

export default async function PackageDetailPage({ params }) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) {
    const governance = await resolveSlugGovernance('package', slug);
    if (governance?.type === 'redirect' && governance.destination) {
      permanentRedirect(governance.destination);
    }
    notFound();
  }

  const [related, navData, siteSettings] = await Promise.all([
    getPackages({ limit: 3, exclude: pkg.id }),
    getNavData(),
    getSiteSettings(),
  ]);
  const packageSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.title,
    description: pkg.meta_description || pkg.short_description || pkg.description || '',
    image: pkg.image_url || undefined,
    touristType: pkg.category || 'travelers',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: String(pkg.discounted_price || pkg.price || ''),
      availability: 'https://schema.org/InStock',
      url: toAbsoluteUrl(`/tour-packages/${pkg.slug}`),
    },
    provider: { '@type': 'TravelAgency', name: 'Rajasthan Tours' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Tour Packages', item: toAbsoluteUrl('/tour-packages') },
      { '@type': 'ListItem', position: 3, name: pkg.title, item: toAbsoluteUrl(`/tour-packages/${pkg.slug}`) },
    ],
  };

  const validFaqs = Array.isArray(pkg.faqs)
    ? pkg.faqs.filter((faq) => faq?.question && faq?.answer)
    : [];
  const faqSchema =
    validFaqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: validFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(packageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
      <PackageDetailPageClient pkg={pkg} related={related} navTours={navData.tours} navBlogs={navData.blogs} navDestinations={navData.destinations} siteSettings={siteSettings} />
    </>
  );
}
