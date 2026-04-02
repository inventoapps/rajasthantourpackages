'use client';

import { Badge } from '@/components/ui/badge';
import EnquiryForm from '@/components/EnquiryForm';

/**
 * Shared Enquiry Form section used on listing pages.
 * @param {{ badge?: string, title?: string, subtitle?: string, packageTitle?: string, bg?: string }} props
 */
export default function EnquiryFormSection({
  badge = 'Get a Quote',
  title = 'Plan Your Rajasthan Tour Today',
  subtitle = 'Share your travel preferences and get a customized itinerary with the best price — free of charge!',
  packageTitle = 'Rajasthan Tour Enquiry',
  bg = 'bg-white',
}) {
  return (
    <section className={`py-16 sm:py-20 ${bg}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">{badge}</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">{title}</h2>
          <p className="text-stone-500 mt-2">{subtitle}</p>
        </div>
        <EnquiryForm packageTitle={packageTitle} />
      </div>
    </section>
  );
}
