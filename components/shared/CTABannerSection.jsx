import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, MapPin } from 'lucide-react';

/**
 * Shared gradient CTA banner used at the bottom of listing pages.
 * @param {{ title: string, subtitle: string, primaryLink?: string, primaryLabel?: string, secondaryLink?: string, secondaryLabel?: string, secondaryIcon?: 'phone'|'map' }} props
 */
export default function CTABanner({
  title = "Can't Find the Right Package?",
  subtitle = "Tell us what you're looking for and we'll create a fully customized Rajasthan tour just for you — at the best price guaranteed.",
  primaryLink = '/contact',
  primaryLabel = 'Get Custom Quote',
  secondaryLink = '/destinations',
  secondaryLabel = 'Explore Destinations',
  secondaryIcon = 'map',
}) {
  const SecondaryIcon = secondaryIcon === 'phone' ? Phone : MapPin;

  return (
    <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryLink}>
            <Button
              size="lg"
              className="bg-white text-amber-700 hover:bg-amber-50 rounded-full px-8 font-semibold shadow-lg"
            >
              {primaryLabel} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href={secondaryLink}>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 font-semibold"
            >
              <SecondaryIcon className="w-4 h-4 mr-2" /> {secondaryLabel}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
