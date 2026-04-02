import PublicHeader from '@/components/shared/PublicHeader';
import { buildMetadata } from '@/lib/seo-governance';
import { getSiteSettings } from '@/lib/public-content';
import Link from 'next/link';
import { FileText, CreditCard, CalendarX, AlertTriangle, Plane, ShieldCheck, Scale, Globe } from 'lucide-react';

export const revalidate = 300;

export const metadata = buildMetadata({
  title: 'Terms & Conditions - Rajasthan Tours',
  description:
    'Review the terms and conditions for booking tours with Rajasthan Tours, including booking policies, payment terms, and traveler responsibilities.',
  canonical: '/terms-conditions',
});

const SECTIONS = [
  {
    icon: FileText,
    title: 'Booking & Reservations',
    blocks: [
      {
        text: 'By making a booking with us, you agree to the following terms:',
        list: [
          'All bookings are subject to availability and confirmation from our team.',
          'A booking is confirmed only after receipt of the required deposit/payment and a written confirmation from us.',
          'The person making the booking must be at least 18 years of age and is responsible for all travelers in the group.',
          'All information provided at the time of booking must be accurate and complete. Incorrect details may result in additional charges or booking failure.',
          'Group sizes, itineraries, and services are as described in the booking confirmation. Changes post-confirmation may incur additional costs.',
        ],
      },
    ],
  },
  {
    icon: CreditCard,
    title: 'Payment Terms',
    blocks: [
      {
        text: 'Payment policies for our tour packages:',
        list: [
          'A non-refundable deposit of 25% of the total tour cost is required at the time of booking.',
          'The remaining balance must be paid at least 15 days before the tour start date.',
          'Payments can be made via bank transfer, UPI, credit/debit card, or other approved methods.',
          'All prices are quoted in Indian Rupees (INR) unless otherwise stated.',
          'Prices are subject to change due to currency fluctuations, fuel surcharges, or changes in government taxes and levies.',
          'Any additional services or activities not included in the package will be charged separately.',
        ],
      },
    ],
  },
  {
    icon: CalendarX,
    title: 'Cancellation & Refund',
    blocks: [
      {
        text: 'Cancellation charges are as follows (calculated from the tour start date):',
        table: [
          { period: 'More than 30 days before', charge: '10% of total cost (or deposit, whichever is higher)' },
          { period: '15–30 days before', charge: '25% of total tour cost' },
          { period: '7–14 days before', charge: '50% of total tour cost' },
          { period: 'Less than 7 days / No Show', charge: '100% of total tour cost (no refund)' },
        ],
      },
      {
        text: 'For detailed information, please refer to our complete Cancellation & Refund Policy.',
        link: { href: '/cancellation-policy', label: 'View Cancellation & Refund Policy →' },
      },
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Changes & Modifications',
    blocks: [
      {
        list: [
          'We reserve the right to modify itineraries, accommodations, or transport due to unforeseen circumstances such as weather, road conditions, political unrest, or government restrictions.',
          'In case of significant changes, we will offer suitable alternatives or a fair refund where applicable.',
          'Requests for itinerary changes by the traveler after booking confirmation may incur additional charges.',
          'Upgrades in accommodation or transport are subject to availability and may require additional payment.',
          'We are not liable for any delays, cancellations, or changes caused by airlines, railways, or other third-party service providers.',
        ],
      },
    ],
  },
  {
    icon: Plane,
    title: 'Traveler Responsibilities',
    blocks: [
      {
        text: 'As a traveler, you agree to:',
        list: [
          'Carry valid identification (Aadhaar, Passport, or Government-issued ID) at all times during the tour.',
          'Ensure you have valid travel insurance covering medical emergencies, trip cancellation, and personal liability.',
          'Follow the instructions of tour guides, drivers, and local authorities at all times.',
          'Respect local customs, traditions, religious sentiments, and wildlife regulations.',
          'Be punctual for all scheduled pickups, activities, and departures. Delays caused by travelers may result in missed services without refund.',
          'Inform us in advance of any medical conditions, dietary requirements, or accessibility needs.',
          'Behave responsibly and not engage in any illegal, disruptive, or environmentally harmful activities.',
        ],
      },
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Limitation of Liability',
    blocks: [
      {
        list: [
          'We act as an intermediary between travelers and third-party service providers (hotels, transport, guides). We are not liable for any negligence, injury, loss, or damage caused by these providers.',
          'We are not responsible for any loss of personal belongings, valuables, or documents during the tour.',
          'Our liability in any case shall not exceed the total tour cost paid by the traveler.',
          'We are not responsible for delays or cancellations caused by force majeure events (natural disasters, pandemics, strikes, government actions).',
          'Medical emergencies during tours are the traveler\'s responsibility. We recommend comprehensive travel and medical insurance.',
          'Photos and descriptions on our website are representative and may vary from the actual experience.',
        ],
      },
    ],
  },
  {
    icon: Globe,
    title: 'Intellectual Property',
    blocks: [
      {
        list: [
          'All content on our website — including text, images, logos, graphics, and design — is our intellectual property or used under license.',
          'You may not reproduce, distribute, or use any content from our website without prior written consent.',
          'User-submitted reviews, photos, or content grant us a non-exclusive, royalty-free license to use them for marketing purposes.',
        ],
      },
    ],
  },
  {
    icon: Scale,
    title: 'Governing Law & Disputes',
    blocks: [
      {
        list: [
          'These terms are governed by the laws of India.',
          'Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of courts in Jaipur, Rajasthan.',
          'We encourage travelers to first contact us directly to resolve any issues before pursuing legal action.',
          'Complaints must be filed within 14 days of the tour completion date for consideration.',
        ],
      },
    ],
  },
];

export default async function TermsConditionsPage() {
  const siteSettings = await getSiteSettings();
  const siteName = siteSettings?.site_name || 'Rajasthan Tours';
  const email = siteSettings?.business_email || 'info@rajasthantours.com';
  const phone = siteSettings?.business_phone || '+91 98765 43210';
  const address =
    siteSettings?.business_address || '123 MI Road, Jaipur, Rajasthan 302001, India';

  return (
    <>
      <PublicHeader />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white py-20 sm:py-28">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-amber-300 text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              Legal Agreement
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-lg text-stone-300 max-w-xl mx-auto">
              Please read these terms carefully before booking any tour or using our services.
            </p>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-stone-50 border-b">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-stone-500">
              <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-stone-800 font-medium">Terms & Conditions</span>
            </nav>
          </div>
        </div>

        {/* Last Updated */}
        <div className="max-w-4xl mx-auto px-4 pt-10 pb-2">
          <p className="text-sm text-stone-500">
            <strong>Last Updated:</strong> January 2025 &nbsp;|&nbsp; <strong>Effective Date:</strong> January 2025
          </p>
        </div>

        {/* Intro */}
        <section className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-stone-700 leading-relaxed">
              Welcome to {siteName}. These Terms & Conditions govern your use of our website
              and services. By accessing our website or booking any of our tour packages, you
              acknowledge that you have read, understood, and agree to be bound by these terms.
              If you do not agree with any part of these terms, please do not use our services.
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
                  <div className="space-y-4 pl-0 sm:pl-14">
                    {section.blocks.map((block, bIdx) => (
                      <div key={bIdx}>
                        {block.text && (
                          <p className="text-stone-600 leading-relaxed mb-3">{block.text}</p>
                        )}
                        {block.list && (
                          <ul className="space-y-2 ml-4">
                            {block.list.map((item, lIdx) => (
                              <li key={lIdx} className="flex items-start gap-2 text-stone-600 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                        {block.table && (
                          <div className="overflow-x-auto rounded-lg border border-stone-200 mt-2">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-stone-100">
                                  <th className="text-left p-3 font-semibold text-stone-700">Cancellation Period</th>
                                  <th className="text-left p-3 font-semibold text-stone-700">Cancellation Charge</th>
                                </tr>
                              </thead>
                              <tbody>
                                {block.table.map((row, rIdx) => (
                                  <tr key={rIdx} className="border-t border-stone-100">
                                    <td className="p-3 text-stone-600">{row.period}</td>
                                    <td className="p-3 text-stone-600">{row.charge}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {block.link && (
                          <Link
                            href={block.link.href}
                            className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium text-sm mt-2 underline underline-offset-2"
                          >
                            {block.link.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Acceptance */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 sm:p-8 mt-10">
            <h2 className="text-xl font-bold text-stone-800 mb-3">
              9. Acceptance of Terms
            </h2>
            <p className="text-stone-600 leading-relaxed">
              By using our website or booking any tour, you confirm that you have read, understood,
              and agreed to these Terms & Conditions. We reserve the right to update these terms at
              any time. Continued use of our services after changes constitutes acceptance of the
              revised terms.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl p-6 sm:p-8 mt-10 text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Questions About Our Terms?
            </h2>
            <p className="text-stone-300 leading-relaxed mb-6">
              If you have any questions or concerns about these Terms & Conditions, please
              don&apos;t hesitate to reach out:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-amber-400 text-sm font-medium mb-1">Email</p>
                <a href={`mailto:${email}`} className="text-white hover:text-amber-300 transition-colors text-sm">
                  {email}
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-amber-400 text-sm font-medium mb-1">Phone</p>
                <a href={`tel:${phone.replace(/[\s\-()]/g, '')}`} className="text-white hover:text-amber-300 transition-colors text-sm">
                  {phone}
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-amber-400 text-sm font-medium mb-1">Address</p>
                <p className="text-white text-sm">{address}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            <Link href="/privacy-policy" className="text-sm text-amber-700 hover:text-amber-800 underline underline-offset-2">
              Privacy Policy
            </Link>
            <span className="text-stone-300">|</span>
            <Link href="/cancellation-policy" className="text-sm text-amber-700 hover:text-amber-800 underline underline-offset-2">
              Cancellation & Refund Policy
            </Link>
            <span className="text-stone-300">|</span>
            <Link href="/disclaimer" className="text-sm text-amber-700 hover:text-amber-800 underline underline-offset-2">
              Disclaimer
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
