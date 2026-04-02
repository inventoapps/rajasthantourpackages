import FAQPageClient from '@/components/pages/FAQPageClient';
import { FAQ_CATEGORIES, getAllFaqs } from '@/lib/faq-data';
import { buildFAQPageSchema, buildBreadcrumbSchema, buildMetadata } from '@/lib/seo-governance';
import { toAbsoluteUrl } from '@/lib/site-url';

export const revalidate = 300;

export const metadata = buildMetadata({
  title: 'Frequently Asked Questions — Rajasthan Tours',
  description:
    'Find answers to common questions about Rajasthan tour packages, booking process, cancellations, travel tips, and more.',
  canonical: '/faq',
  keywords:
    'Rajasthan tours FAQ, Rajasthan travel questions, tour booking help, Rajasthan trip planning, travel FAQ',
});

/**
 * FAQ Page — Server Component
 * All FAQ content is rendered server-side for SEO.
 * FAQPageClient adds client-side search & accordion interactivity.
 */
export default function FAQPage() {
  const allFaqs = getAllFaqs();
  const faqSchema = buildFAQPageSchema(allFaqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: toAbsoluteUrl('/') },
    { name: 'FAQs', url: toAbsoluteUrl('/faq') },
  ]);

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FAQPageClient categories={FAQ_CATEGORIES} />
    </>
  );
}
