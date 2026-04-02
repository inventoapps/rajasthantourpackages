import AboutPageClient from '@/components/pages/AboutPageClient';
import { toAbsoluteUrl } from '@/lib/site-url';
import PublicHeader from '@/components/shared/PublicHeader';
import { buildMetadata } from '@/lib/seo-governance';
import { IMG_OG_DEFAULT } from '@/lib/image-config';
import { getSiteSettings } from '@/lib/public-content';

export const revalidate = 300;

export const metadata = buildMetadata({
  title: 'About Rajasthan Tours',
  description:
    'Learn about Rajasthan Tours, our local travel expertise, and our commitment to creating authentic Rajasthan experiences.',
  canonical: '/about',
  image: IMG_OG_DEFAULT,
});

export default async function AboutPage() {
  const siteSettings = await getSiteSettings();
  const phone = siteSettings?.business_phone || '+91 98765 43210';

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteSettings?.site_name || 'Rajasthan Tours',
    url: toAbsoluteUrl('/'),
    logo: siteSettings?.logo_url || toAbsoluteUrl('/favicon.ico'),
    description:
      'Local Rajasthan travel experts offering curated heritage, desert, wildlife, and luxury tours.',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: phone,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <PublicHeader />
      <AboutPageClient />
    </>
  );
}
