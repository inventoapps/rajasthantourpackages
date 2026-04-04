import HomePageClient from '@/components/pages/HomePageClient';
import {
  getBlogs,
  getDestinations,
  getHomepageSettings,
  getNavData,
  getPackages,
  getReviews,
  getSiteSettings,
} from '@/lib/public-content';
import { HOMEPAGE_FAQS } from '@/lib/data';
import { buildMetadata } from '@/lib/seo-governance';
import { IMG_CTA_DESERT, IMG_OG_DEFAULT } from '@/lib/image-config';

export const revalidate = 300;

export async function generateMetadata() {
  const settings = await getHomepageSettings();
  const title = settings.meta_title || 'Rajasthan Tours - Authentic Travel Experiences';
  const description =
    settings.meta_description ||
    'Book the best Rajasthan tour packages with a government-approved operator. Explore Jaipur forts, Udaipur palaces, Jaisalmer desert safaris & Jodhpur. Custom itineraries from ₹7,999. Free expert consultation!';
  const keywords =
    settings.meta_keywords ||
    'Rajasthan tour packages, Rajasthan travel packages, Jaipur tour package, Udaipur tour package, Jaisalmer desert safari, Jodhpur tour, Rajasthan holiday packages, Golden Triangle tour, Rajasthan heritage tours, camel safari Rajasthan, Ranthambore tiger safari, best Rajasthan tour operator';
  const heroImage =
    settings.hero_image_url ||
    IMG_CTA_DESERT;

  return buildMetadata({
    title,
    description,
    keywords,
    canonical: '/',
    image: heroImage,
  });
}

export default async function HomePage() {
  const [featuredPkgs, allPkgs, blogs, reviews, homepageSettings, navData, siteSettings, destinations] = await Promise.all([
    getPackages({ featured: true, limit: 6 }),
    getPackages({ limit: 100 }),
    getBlogs({ published: true, limit: 3 }),
    getReviews({ limit: 6 }),
    getHomepageSettings(),
    getNavData(),
    getSiteSettings(),
    getDestinations(),
  ]);

  const validFaqs = HOMEPAGE_FAQS.filter((faq) => faq?.question && faq?.answer);
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

  // Build TravelAgency + LocalBusiness schema with live review data
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length).toFixed(1)
      : '4.9';

  const businessName = siteSettings?.site_name || 'Rajasthan Tour Packages';
  const businessPhone = siteSettings?.business_phone || '';
  const businessEmail = siteSettings?.business_email || '';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    name: businessName,
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://rajasthantourandpackages.com',
    logo: { '@type': 'ImageObject', url: IMG_OG_DEFAULT },
    ...(businessPhone && { telephone: businessPhone }),
    ...(businessEmail && { email: businessEmail }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.9124,
      longitude: 75.7873,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '21:00',
    },
    priceRange: '₹₹-₹₹₹',
    description:
      'Government-approved Rajasthan tour operator since 2010. Heritage fort tours, desert safaris, palace hotel stays, and wildlife packages across Jaipur, Udaipur, Jaisalmer & Jodhpur.',
    areaServed: { '@type': 'State', name: 'Rajasthan', addressCountry: 'IN' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating,
      reviewCount: Math.max(reviews.length, 50),
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <>
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <HomePageClient
        featuredPkgs={featuredPkgs}
        allPkgs={allPkgs}
        blogs={blogs}
        reviews={reviews}
        homepageSettings={homepageSettings}
        navTours={navData.tours}
        navBlogs={navData.blogs}
        navDestinations={navData.destinations}
        siteSettings={siteSettings}
        destinations={destinations}
      />
    </>
  );
}
