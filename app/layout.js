import { Inter } from 'next/font/google';
import './globals.css';
import { getBaseUrl } from '@/lib/site-url';
import { getSiteSettings } from '@/lib/public-content';
import PublicFooter from '@/components/shared/PublicFooter';
import FloatingCTA from '@/components/shared/FloatingCTA';
import GlobalEnquiryPopup from '@/components/shared/GlobalEnquiryPopup';
import { headers } from 'next/headers';
import { IMG_OG_DEFAULT } from '@/lib/image-config';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: { default: 'Rajasthan Tour Packages | Best Travel Deals & Heritage Tours', template: '%s | Rajasthan Tours' },
  description: 'Discover the best Rajasthan tour packages. Explore Jaipur, Udaipur, Jaisalmer, Jodhpur with expert guides. Heritage tours, desert safaris, wildlife trips & luxury stays.',
  keywords: 'Rajasthan tour packages, Rajasthan travel, Jaipur tour, Udaipur tour, Jaisalmer desert safari, Jodhpur, heritage tours, royal Rajasthan, camel safari, Ranthambore, Golden Triangle',
  openGraph: {
    title: 'Rajasthan Tour Packages | Explore the Land of Kings',
    description: 'Book the best Rajasthan tour packages. Heritage forts, desert safaris, lake palaces & wildlife tours. Starting from Rs 7,999.',
    url: '/', siteName: 'Rajasthan Tours', locale: 'en_IN', type: 'website',
    images: [{ url: IMG_OG_DEFAULT, width: 1200, height: 630, alt: 'Rajasthan Tour Packages' }],
  },
  twitter: { card: 'summary_large_image', title: 'Rajasthan Tour Packages', description: 'Explore Jaipur, Udaipur, Jaisalmer & more.', images: [IMG_OG_DEFAULT] },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#d97706',
};

export default async function RootLayout({ children }) {
  let siteSettings = null;
  try {
    siteSettings = await getSiteSettings();
  } catch (e) {
    // Graceful fallback — site settings table may not exist yet
  }

  // Hide public footer on admin routes
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isAdmin = pathname.startsWith('/admin');

  const faviconUrl = siteSettings?.favicon_url || null;
  const siteName = siteSettings?.site_name || 'Rajasthan Tours';
  const ogImage = siteSettings?.og_default_image_url || IMG_OG_DEFAULT;
  const ogImageAlt = siteSettings?.og_default_image_alt || 'Rajasthan Tour Packages';

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'TravelAgency',
    name: siteName, description: 'Premium Rajasthan tour packages.',
    url: getBaseUrl(),
    ...(siteSettings?.logo_url && { logo: siteSettings.logo_url }),
    telephone: siteSettings?.business_phone || '+91 98765 43210',
    email: siteSettings?.business_email || 'info@rajasthantours.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteSettings?.business_address || '123 MI Road, Jaipur, Rajasthan 302001, India',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN',
    },
    areaServed: { '@type': 'State', name: 'Rajasthan', containedInPlace: { '@type': 'Country', name: 'India' } },
    priceRange: 'Rs 7,999 - Rs 54,999',
  };
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {faviconUrl ? (
          <>
            <link rel="icon" href={faviconUrl} type="image/x-icon" />
            <link rel="apple-touch-icon" href={faviconUrl} />
          </>
        ) : (
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={inter.className}>
        {children}
        {!isAdmin && <PublicFooter siteSettings={siteSettings} />}
        {!isAdmin && <FloatingCTA siteSettings={siteSettings} />}
        {!isAdmin && <GlobalEnquiryPopup />}
      </body>
    </html>
  );
}
