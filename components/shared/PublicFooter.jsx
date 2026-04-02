import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const DEFAULTS = {
  business_phone: '+91 98765 43210',
  business_email: 'info@rajasthantours.com',
  business_address: '123 MI Road, Jaipur, Rajasthan 302001, India',
  business_hours: 'Mon-Sat: 9AM - 7PM',
  site_name: 'Rajasthan Tours',
};

export default function PublicFooter({ siteSettings }) {
  const phone = siteSettings?.business_phone || DEFAULTS.business_phone;
  const email = siteSettings?.business_email || DEFAULTS.business_email;
  const address = siteSettings?.business_address || DEFAULTS.business_address;
  const hours = siteSettings?.business_hours || DEFAULTS.business_hours;
  const siteName = siteSettings?.site_name || DEFAULTS.site_name;
  const phoneHref = `tel:${phone.replace(/[\s\-()]/g, '')}`;
  const emailHref = `mailto:${email}`;

  return (
    <footer className="bg-stone-900 text-stone-300" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              {siteSettings?.logo_url ? (
                <Image
                  src={siteSettings.logo_url}
                  alt={siteSettings.logo_alt || 'Logo'}
                  width={siteSettings.logo_width || 160}
                  height={siteSettings.logo_height || 50}
                  className="h-10 w-auto brightness-0 invert"
                />
              ) : (
                <h3 className="text-xl font-bold text-white">
                  <span className="text-amber-500">{siteName.split(' ')[0]}</span> {siteName.split(' ').slice(1).join(' ')}
                </h3>
              )}
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted partner for authentic Rajasthan travel experiences
              since 2010. We craft personalized journeys through the land of
              kings.
            </p>
            <div className="flex gap-3">
              {['facebook', 'instagram', 'twitter', 'youtube'].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 transition-colors text-xs uppercase font-bold text-stone-400 hover:text-white"
                >
                  {s[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            {[
              { label: 'Tour Packages', href: '/tour-packages' },
              { label: 'Destinations', href: '/destinations' },
              { label: 'About Us', href: '/about' },
              { label: 'Blogs', href: '/blogs' },
              { label: 'Contact Us', href: '/contact' },
              { label: 'FAQs', href: '/faq' },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="block text-sm py-1.5 hover:text-amber-400 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            {[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms & Conditions', href: '/terms-conditions' },
              { label: 'Cancellation Policy', href: '/cancellation-policy' },
              { label: 'Disclaimer', href: '/disclaimer' },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="block text-sm py-1.5 hover:text-amber-400 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Popular Tours */}
          <div>
            <h4 className="font-semibold text-white mb-4">Popular Tours</h4>
            {[
              'Jaipur Heritage Tour',
              'Udaipur Lake Romance',
              'Jaisalmer Desert Safari',
              'Grand Rajasthan Circuit',
              'Ranthambore Wildlife',
            ].map((l) => (
              <p
                key={l}
                className="text-sm py-1.5 hover:text-amber-400 cursor-pointer transition-colors"
              >
                {l}
              </p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
                {address}
              </p>
              <a href={phoneHref} className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Phone className="w-4 h-4 text-amber-500" />
                {phone}
              </a>
              <a href={emailHref} className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Mail className="w-4 h-4 text-amber-500" />
                {email}
              </a>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                {hours}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">Privacy</Link>
            <span>·</span>
            <Link href="/terms-conditions" className="hover:text-amber-400 transition-colors">Terms</Link>
            <span>·</span>
            <Link href="/disclaimer" className="hover:text-amber-400 transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
