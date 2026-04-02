import PublicHeader from '@/components/shared/PublicHeader';
import { buildMetadata } from '@/lib/seo-governance';

export const revalidate = 300;

export const metadata = buildMetadata({
  title: 'FAQs - Rajasthan Tours',
  description:
    'Find answers to frequently asked questions about Rajasthan tour bookings, payments, cancellations, travel tips, and more.',
  canonical: '/faq',
});

export default function FAQLayout({ children }) {
  return (
    <>
      <PublicHeader />
      {children}
    </>
  );
}
