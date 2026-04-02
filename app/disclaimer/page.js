import PublicHeader from '@/components/shared/PublicHeader';
import { buildMetadata } from '@/lib/seo-governance';
import { getSiteSettings } from '@/lib/public-content';
import Link from 'next/link';
import { AlertTriangle, ExternalLink, Image as ImageIcon, Globe, FileWarning, Scale } from 'lucide-react';

export const revalidate = 300;

export const metadata = buildMetadata({
  title: 'Disclaimer - Rajasthan Tours',
  description:
    'Read the legal disclaimer for Rajasthan Tours website. Understand the limitations of liability, accuracy of information, and external link policies.',
  canonical: '/disclaimer',
});

const SECTIONS = [
  {
    icon: Globe,
    title: 'General Information',
    content:
      'The information provided on this website is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is strictly at your own risk.',
  },
  {
    icon: AlertTriangle,
    title: 'Travel Information Accuracy',
    content:
      'Tour itineraries, prices, hotel details, vehicle types, and other travel-related information displayed on this website are subject to change without prior notice. Factors such as weather conditions, road closures, government regulations, local festivals, seasonal variations, and availability may affect the actual services delivered. While we make every effort to ensure accuracy, actual tour experiences may vary from the descriptions and photographs shown on our website.',
  },
  {
    icon: ImageIcon,
    title: 'Images & Visual Content',
    content:
      'Photographs, videos, and illustrations used on this website are for representational purposes only. They may include stock photography, professional travel photography, or user-contributed images. Actual views, hotel rooms, vehicles, landscapes, and experiences may differ from the images displayed. Colors, sizes, and appearances may vary due to screen settings and photographic conditions.',
  },
  {
    icon: ExternalLink,
    title: 'External Links',
    content:
      'Our website may contain links to third-party websites for your convenience and reference. These external sites are not under our control, and we are not responsible for the content, privacy practices, or availability of such websites. The inclusion of any link does not imply endorsement or recommendation by us. We encourage you to review the terms and privacy policies of any third-party websites you visit.',
  },
  {
    icon: FileWarning,
    title: 'No Professional Advice',
    content:
      'Nothing on this website constitutes professional travel, medical, legal, or financial advice. For specific travel requirements (visa, health vaccinations, travel insurance, currency regulations), please consult with appropriate professionals or government authorities. We recommend purchasing comprehensive travel insurance to cover unforeseen circumstances during your trip.',
  },
  {
    icon: Scale,
    title: 'Limitation of Liability',
    content:
      'In no event shall we be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of this website or our services, including but not limited to loss of data, revenue, profits, or business opportunities. This limitation applies regardless of whether the damages arise from breach of contract, tort (including negligence), or any other legal theory. Our total liability shall not exceed the total amount paid by you for the specific tour or service in question.',
  },
];

export default async function DisclaimerPage() {
  const siteSettings = await getSiteSettings();
  const siteName = siteSettings?.site_name || 'Rajasthan Tours';
  const email = siteSettings?.business_email || 'info@rajasthantours.com';
  const phone = siteSettings?.business_phone || '+91 98765 43210';

  return (
    <>
      <PublicHeader />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white py-20 sm:py-28">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-amber-300 text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" />
              Legal Notice
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">Disclaimer</h1>
            <p className="text-lg text-stone-300 max-w-xl mx-auto">
              Important legal information about the use of our website and services.
            </p>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-stone-50 border-b">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-stone-500">
              <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-stone-800 font-medium">Disclaimer</span>
            </nav>
          </div>
        </div>

        {/* Last Updated */}
        <div className="max-w-4xl mx-auto px-4 pt-10 pb-2">
          <p className="text-sm text-stone-500">
            <strong>Last Updated:</strong> January 2025
          </p>
        </div>

        {/* Intro */}
        <section className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-stone-700 leading-relaxed">
              This disclaimer applies to the {siteName} website and all services offered through it.
              By using our website or booking our services, you acknowledge that you have read and
              understood this disclaimer. Please read it carefully before using our website.
            </p>
          </div>
        </section>

        {/* Sections */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-10">
            {SECTIONS.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div key={idx} className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-amber-700" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-stone-800">
                      {idx + 1}. {section.title}
                    </h2>
                  </div>
                  <div className="pl-0 sm:pl-14">
                    <p className="text-stone-600 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Clauses */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-800 mb-4">
              7. User-Generated Content
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Any reviews, testimonials, or feedback submitted by users represent the views
              and opinions of the respective authors and do not necessarily reflect our views.
              We are not responsible for the accuracy or reliability of user-generated content.
              We reserve the right to remove any content that we deem inappropriate, misleading,
              or in violation of our terms.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-800 mb-4">
              8. Indemnification
            </h2>
            <p className="text-stone-600 leading-relaxed">
              You agree to indemnify and hold harmless {siteName}, its directors, employees,
              partners, and agents from any claims, damages, losses, or expenses (including
              legal fees) arising from your use of our website or services, your violation of
              these terms, or your infringement of any third-party rights.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-800 mb-4">
              9. Changes to This Disclaimer
            </h2>
            <p className="text-stone-600 leading-relaxed">
              We may update this disclaimer from time to time without prior notice. Any changes
              will be posted on this page with an updated date. We encourage you to review this
              page periodically. Your continued use of our website after changes are posted
              constitutes acceptance of the revised disclaimer.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl p-6 sm:p-8 mt-10 text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Contact Information
            </h2>
            <p className="text-stone-300 leading-relaxed mb-6">
              For any questions regarding this disclaimer, please contact us:
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`mailto:${email}`} className="bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3 hover:bg-white/20 transition-colors text-sm">
                <span className="text-amber-400 font-medium">Email: </span>
                <span className="text-white">{email}</span>
              </a>
              <a href={`tel:${phone.replace(/[\s\-()]/g, '')}`} className="bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3 hover:bg-white/20 transition-colors text-sm">
                <span className="text-amber-400 font-medium">Phone: </span>
                <span className="text-white">{phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            <Link href="/privacy-policy" className="text-sm text-amber-700 hover:text-amber-800 underline underline-offset-2">
              Privacy Policy
            </Link>
            <span className="text-stone-300">|</span>
            <Link href="/terms-conditions" className="text-sm text-amber-700 hover:text-amber-800 underline underline-offset-2">
              Terms & Conditions
            </Link>
            <span className="text-stone-300">|</span>
            <Link href="/cancellation-policy" className="text-sm text-amber-700 hover:text-amber-800 underline underline-offset-2">
              Cancellation & Refund Policy
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
