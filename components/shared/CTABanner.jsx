'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles, Send, Phone, Shield, Heart, Award } from 'lucide-react';
import { IMG_CTA_DESERT } from '@/lib/image-config';

/**
 * Full-width CTA banner with gradient overlay.
 *
 * @param {object} props
 * @param {string} [props.heading] - Main heading text
 * @param {string} [props.subheading] - Supporting description
 * @param {string} [props.bgImage] - Background image URL
 * @param {Function} [props.onEnquire] - Callback for primary button click
 * @param {string} [props.primaryLabel] - Primary button text
 * @param {string} [props.secondaryHref] - Secondary button link
 * @param {string} [props.secondaryLabel] - Secondary button text
 * @param {boolean} [props.showTrustBadges] - Whether to show trust badges below buttons
 */
export default function CTABanner({
  heading = 'Ready to Explore the Royal Land of Rajasthan?',
  subheading = 'Let our travel experts craft the perfect itinerary for you. From majestic forts to golden deserts, experience the magic of Rajasthan.',
  bgImage = IMG_CTA_DESERT,
  onEnquire,
  primaryLabel = 'Get Free Quote',
  secondaryHref = '/tour-packages',
  secondaryLabel = 'Browse Packages',
  showTrustBadges = true,
}) {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0">
        {bgImage && <Image src={bgImage} alt="Rajasthan" fill sizes="100vw" unoptimized className="object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 via-amber-800/85 to-orange-900/90" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <Sparkles className="w-8 h-8 text-amber-300 mx-auto mb-4" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
          {heading}
        </h2>
        <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
          {subheading}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {onEnquire ? (
            <Button
              onClick={onEnquire}
              className="bg-white text-amber-700 hover:bg-amber-50 px-8 py-6 rounded-full text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <Send className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
              {primaryLabel}
            </Button>
          ) : (
            <Link href="/contact">
              <Button className="bg-white text-amber-700 hover:bg-amber-50 px-8 py-6 rounded-full text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
                {primaryLabel}
              </Button>
            </Link>
          )}
          <Link href={secondaryHref}>
            <Button className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-full text-base font-bold transition-all duration-300">
              {secondaryLabel}
            </Button>
          </Link>
        </div>
        {showTrustBadges && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" />100% Secure Booking</span>
            <span className="flex items-center gap-1.5"><Heart className="w-4 h-4" />Handcrafted Itineraries</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4" />Trusted by 10,000+ Travellers</span>
            <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" />24/7 Support</span>
          </div>
        )}
      </div>
    </section>
  );
}
