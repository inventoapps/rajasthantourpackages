import { notFound, permanentRedirect } from 'next/navigation';
import PackageDetailPageClient from '@/components/pages/PackageDetailPageClient';
import TourPackagesPageClient from '@/components/pages/TourPackagesPageClient';
import { getPackageBySlug, getPackages, getPackageSlugs, getNavData, getSiteSettings, getReviews } from '@/lib/public-content';
import { toAbsoluteUrl } from '@/lib/site-url';
import { buildMetadata, buildBreadcrumbSchema, buildFAQPageSchema, buildItemListSchema, resolveSlugGovernance } from '@/lib/seo-governance';
import { IMG_OG_DEFAULT } from '@/lib/image-config';
import PublicHeader from '@/components/shared/PublicHeader';

export const revalidate = 300;

/* ── Duration landing page helpers ── */
const DURATION_PATTERN = /^(\d{1,2})-day-rajasthan-tour-packages$/;

function parseDuration(slug) {
  const m = slug.match(DURATION_PATTERN);
  if (!m) return null;
  const d = parseInt(m[1], 10);
  return d >= 1 && d <= 10 ? d : null;
}

const DURATION_META = {
  1: { title: '1 Day Rajasthan Tour Packages — Quick Day Trips & Sightseeing', desc: 'Explore the best 1 day Rajasthan tour packages. Perfect day trips to Jaipur, Udaipur, Jodhpur with expert guides, AC transport & hassle-free booking. Starting ₹2,999.', keywords: '1 day Rajasthan tour, Jaipur day trip, one day tour Rajasthan' },
  2: { title: '2 Days Rajasthan Tour Packages — Weekend Getaway Tours', desc: 'Book 2 days Rajasthan tour packages for a quick weekend escape. Cover Jaipur forts, Pushkar temples or Ranthambore safari. Starting ₹5,999 with stay & transport.', keywords: '2 day Rajasthan tour, weekend Rajasthan trip, 2 day Jaipur tour' },
  3: { title: '3 Days Rajasthan Tour Packages — Perfect Short Trips (2 Nights)', desc: 'Discover 3 days 2 nights Rajasthan tour packages. Explore Jaipur, Pushkar, or Udaipur with handcrafted itineraries. Starting ₹7,999 per person all-inclusive.', keywords: '3 day Rajasthan tour, 3 days 2 nights Rajasthan package, short Rajasthan trip' },
  4: { title: '4 Days Rajasthan Tour Packages — City Duos & Heritage Tours', desc: 'Book 4 days Rajasthan tour packages covering Jaipur-Udaipur or Jaipur-Jodhpur. Heritage forts, lake palaces & desert culture. Starting ₹10,999.', keywords: '4 day Rajasthan tour, 4 days 3 nights Rajasthan package, Jaipur Udaipur tour' },
  5: { title: '5 Days Rajasthan Tour Packages — Desert & Fort Explorer', desc: 'Explore 5 days Rajasthan tour packages. Jaipur-Jodhpur-Jaisalmer desert circuit with camel safari, fort tours & camp stay. Starting ₹14,999.', keywords: '5 day Rajasthan tour, 5 days 4 nights Rajasthan, Jaisalmer desert tour' },
  6: { title: '6 Days Rajasthan Tour Packages — Extended Heritage Circuit', desc: 'Book 6 days Rajasthan tour packages. Cover Jaipur, Jodhpur, Jaisalmer & Udaipur with palace stays and desert camping. Starting ₹18,999.', keywords: '6 day Rajasthan tour, 6 days 5 nights Rajasthan, Rajasthan circuit tour' },
  7: { title: '7 Days Rajasthan Tour Packages — Complete Royal Rajasthan (1 Week)', desc: 'Explore 7 days Rajasthan tour packages covering the full royal circuit: Jaipur, Jodhpur, Jaisalmer, Udaipur. Palace stays, desert safari & more. Starting ₹22,999.', keywords: '7 day Rajasthan tour, 1 week Rajasthan package, 7 days 6 nights Rajasthan' },
  8: { title: '8 Days Rajasthan Tour Packages — Grand Heritage & Wildlife', desc: 'Book 8 days Rajasthan tour packages. Full circuit with Ranthambore tiger safari, desert camping & Udaipur lakeside stays. Starting ₹28,999.', keywords: '8 day Rajasthan tour, 8 days 7 nights Rajasthan, Rajasthan grand tour' },
  9: { title: '9 Days Rajasthan Tour Packages — Ultimate Cultural Journey', desc: 'Explore 9 days Rajasthan tour packages. Deep cultural immersion across 6+ cities with palace hotels, village visits & folk experiences. Starting ₹34,999.', keywords: '9 day Rajasthan tour, 9 days Rajasthan package, Rajasthan cultural tour' },
  10: { title: '10 Days Rajasthan Tour Packages — The Complete Rajasthan Experience', desc: 'Book 10 days Rajasthan tour packages for the ultimate experience. Cover every iconic destination with luxury stays, safari, desert camp & private guides. Starting ₹39,999.', keywords: '10 day Rajasthan tour, 10 days 9 nights Rajasthan, complete Rajasthan tour' },
};

export async function generateStaticParams() {
  const packageSlugs = await getPackageSlugs();
  const durationSlugs = Array.from({ length: 10 }, (_, i) => `${i + 1}-day-rajasthan-tour-packages`);
  return [...packageSlugs.map((slug) => ({ slug })), ...durationSlugs.map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  /* ── Duration listing page ── */
  const days = parseDuration(slug);
  if (days) {
    const meta = DURATION_META[days] || {};
    return buildMetadata({
      title: meta.title || `${days} Days Rajasthan Tour Packages`,
      description: meta.desc || `Explore the best ${days} day Rajasthan tour packages with handcrafted itineraries, expert guides, and best price guarantee.`,
      keywords: meta.keywords || `${days} day Rajasthan tour, ${days} days Rajasthan package`,
      canonical: `/tour-packages/${slug}`,
    });
  }

  /* ── Individual package page ── */
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

  /* ── Duration listing page ── */
  const days = parseDuration(slug);
  if (days) {
    const [packages, reviews] = await Promise.all([
      getPackages({ duration: String(days), limit: 100 }),
      getReviews(),
    ]);

    const pageTitle = `${days} Day${days > 1 ? 's' : ''} Rajasthan Tour Packages`;

    const breadcrumbSchema = buildBreadcrumbSchema([
      { name: 'Home', url: toAbsoluteUrl('/') },
      { name: 'Tour Packages', url: toAbsoluteUrl('/tour-packages') },
      { name: pageTitle, url: toAbsoluteUrl(`/tour-packages/${slug}`) },
    ]);

    const itemListSchema = buildItemListSchema(
      pageTitle,
      packages.map((pkg) => ({ name: pkg.title, url: toAbsoluteUrl(`/tour-packages/${pkg.slug}`) }))
    );

    const durationFaqs = [
      { question: `How much does a ${days} day Rajasthan tour cost?`, answer: `Our ${days} day Rajasthan tour packages start from ₹${days <= 3 ? '5,999' : days <= 5 ? '12,999' : days <= 7 ? '20,999' : '30,999'} per person. Price varies based on hotel category, group size, and customization.` },
      { question: `What places can I visit in a ${days} day Rajasthan tour?`, answer: days <= 3 ? `In a ${days} day tour you can explore one city in depth — Jaipur (Amber Fort, Hawa Mahal, City Palace) or Udaipur (Lake Pichola, City Palace) are the most popular choices.` : days <= 5 ? `A ${days} day Rajasthan tour covers 2-3 cities. Popular routes include Jaipur + Jodhpur, Jaipur + Udaipur, or the Jaipur-Pushkar-Ajmer circuit.` : `A ${days} day Rajasthan tour covers 4-6 cities. The classic Jaipur → Jodhpur → Jaisalmer → Udaipur route is the most popular, with optional additions like Ranthambore, Pushkar, or Mount Abu.` },
      { question: `Is a ${days} day Rajasthan tour enough?`, answer: days <= 3 ? `A ${days} day tour is perfect for a focused city experience or a weekend getaway.` : days <= 7 ? `Yes! ${days} days is an ideal duration for Rajasthan. You'll cover the major cities and attractions without feeling rushed.` : `${days} days gives you the ultimate Rajasthan experience — enough time to explore all major cities, enjoy desert camping, wildlife safaris, and hidden gems at a relaxed pace.` },
    ];
    const faqSchema = buildFAQPageSchema(durationFaqs);

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <PublicHeader />
        <TourPackagesPageClient
          initialPackages={packages}
          initialCategory="all"
          initialSearch=""
          initialDuration={String(days)}
          reviews={reviews}
        />
      </>
    );
  }

  /* ── Individual package detail page ── */
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
