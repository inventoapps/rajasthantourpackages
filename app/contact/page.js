import ContactPageClient from '@/components/pages/ContactPageClient';
import { toAbsoluteUrl } from '@/lib/site-url';
import PublicHeader from '@/components/shared/PublicHeader';
import { buildMetadata } from '@/lib/seo-governance';
import { getSiteSettings } from '@/lib/public-content';

export const revalidate = 300;

export const metadata = buildMetadata({
  title: 'Contact Rajasthan Tours',
  description:
    'Get in touch with Rajasthan Tours for custom itineraries, package details, pricing, and travel support.',
  canonical: '/contact',
});

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();
  const phone = siteSettings?.business_phone || '+91 98765 43210';
  const email = siteSettings?.business_email || 'info@rajasthantours.com';
  const address = siteSettings?.business_address || '123 MI Road, Jaipur, Rajasthan 302001, India';

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Rajasthan Tours',
    url: toAbsoluteUrl('/contact'),
    mainEntity: {
      '@type': 'Organization',
      name: siteSettings?.site_name || 'Rajasthan Tours',
      url: toAbsoluteUrl('/'),
      email,
      telephone: phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: address,
        addressLocality: 'Jaipur',
        postalCode: '302001',
        addressRegion: 'Rajasthan',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <PublicHeader />
      <ContactPageClient siteSettings={siteSettings} />
    </>
  );
}
