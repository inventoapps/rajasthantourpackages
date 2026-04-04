import TourPackagesPageClient from '@/components/pages/TourPackagesPageClient';
import { getPackages, getReviews } from '@/lib/public-content';
import { toAbsoluteUrl } from '@/lib/site-url';
import PublicHeader from '@/components/shared/PublicHeader';
import { buildMetadata, buildBreadcrumbSchema, buildFAQPageSchema, buildItemListSchema } from '@/lib/seo-governance';

export const revalidate = 300;

export async function generateMetadata() {
  return buildMetadata({
    title: 'Rajasthan Tour Packages — Best Deals on Heritage, Desert & Luxury Tours (2025)',
    description:
      'Book the best Rajasthan tour packages starting ₹8,000. Heritage tours, luxury palace stays, desert safaris, wildlife trips & more. 50,000+ happy travelers. Customizable itineraries with best price guarantee.',
    canonical: '/tour-packages',
    keywords:
      'Rajasthan tour packages, Rajasthan holiday packages, Rajasthan travel packages, Jaipur tour, Udaipur tour, Jaisalmer desert safari, Rajasthan luxury tour, heritage tour Rajasthan, wildlife safari Ranthambore, best Rajasthan tours',
  });
}

export default async function TourPackagesPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || 'all';
  const search = params?.search || '';
  const duration = params?.duration || 'all';
  const [packages, reviews] = await Promise.all([
    getPackages({ category, search, duration: duration !== 'all' ? duration : undefined, limit: 100 }),
    getReviews(),
  ]);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: toAbsoluteUrl('/') },
    { name: 'Tour Packages', url: toAbsoluteUrl('/tour-packages') },
  ]);

  const itemListSchema = buildItemListSchema(
    'Rajasthan Tour Packages',
    packages.map((pkg) => ({ name: pkg.title, url: toAbsoluteUrl(`/tour-packages/${pkg.slug}`) }))
  );

  const faqSchema = buildFAQPageSchema([
    { question: 'What types of Rajasthan tour packages do you offer?', answer: 'We offer a wide range of tour packages including Heritage & Culture tours, Luxury Palace tours, Desert Safari adventures, Wildlife & Tiger Safari, Spiritual & Pilgrimage tours, Honeymoon & Romantic getaways, Family holidays, and customized private tours.' },
    { question: 'How much does a Rajasthan tour package cost?', answer: 'Rajasthan tour packages start from ₹8,000 per person for budget 3-day trips. Mid-range packages (5–7 days) cost ₹15,000–35,000 per person. Luxury palace-stay packages range from ₹50,000–1,50,000+ per person.' },
    { question: 'Can I customize my Rajasthan tour package?', answer: 'Absolutely! All our packages are fully customizable. You can modify the itinerary, change hotels, add or remove destinations, extend your trip, or include special experiences.' },
    { question: 'What is included in your tour packages?', answer: 'Our standard packages include comfortable accommodation, private AC vehicle with experienced driver, daily breakfast, all sightseeing as per itinerary, monument entry fees, airport/railway station transfers, and 24/7 travel support.' },
    { question: 'How do I book a Rajasthan tour package?', answer: 'Browse our packages, fill out the enquiry form with your travel dates and preferences, and our travel expert will call you within 2 hours with a detailed itinerary and quote. We require a 25% advance to confirm your booking.' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PublicHeader />
      <TourPackagesPageClient
        initialPackages={packages}
        initialCategory={category}
        initialSearch={search}
        initialDuration={duration}
        reviews={reviews}
      />
    </>
  );
}
