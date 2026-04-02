'use client';
import { MessageCircle, Phone } from 'lucide-react';

/**
 * Sticky floating WhatsApp + Call buttons.
 * Rendered once in the root layout so it appears on every public page.
 */
export default function FloatingCTA({ siteSettings }) {
  const phoneRaw = siteSettings?.business_phone || '+91 98765 43210';
  const whatsappNumber = phoneRaw.replace(/\D/g, '');
  const whatsappMsg = encodeURIComponent(
    'Hi! I am interested in Rajasthan tour packages. Please share details and best offers.',
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 print:hidden">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 animate-bounce"
        aria-label="Chat on WhatsApp"
        style={{ animationDuration: '2s' }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>

      {/* Call */}
      <a
        href={`tel:${phoneRaw}`}
        className="w-14 h-14 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}
