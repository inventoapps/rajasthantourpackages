import PublicHeader from '@/components/shared/PublicHeader';
import { buildMetadata } from '@/lib/seo-governance';
import { getSiteSettings } from '@/lib/public-content';
import Link from 'next/link';
import { Shield, Lock, Eye, Server, Cookie, UserCheck, Mail } from 'lucide-react';

export const revalidate = 300;

export const metadata = buildMetadata({
  title: 'Privacy Policy - Rajasthan Tours',
  description:
    'Read the privacy policy of Rajasthan Tours. Learn how we collect, use, and protect your personal data when you use our travel services.',
  canonical: '/privacy-policy',
});

const SECTIONS = [
  {
    icon: Eye,
    title: 'Information We Collect',
    content: [
      {
        subtitle: 'Personal Information',
        text: 'When you book a tour, submit an enquiry, or contact us, we may collect the following personal information:',
        list: [
          'Full name and title',
          'Email address and phone number',
          'Mailing or billing address',
          'Passport details and nationality (for international travelers)',
          'Travel preferences and special requirements (dietary, medical, accessibility)',
          'Payment and billing information',
        ],
      },
      {
        subtitle: 'Automatically Collected Information',
        text: 'When you visit our website, we may automatically collect:',
        list: [
          'IP address and browser type',
          'Device type and operating system',
          'Pages visited, time spent, and navigation patterns',
          'Referring website or search terms used',
          'Cookies and similar tracking technologies',
        ],
      },
    ],
  },
  {
    icon: Lock,
    title: 'How We Use Your Information',
    content: [
      {
        text: 'We use the collected information for the following purposes:',
        list: [
          'Processing and confirming tour bookings and reservations',
          'Communicating with you about your travel plans, itineraries, and updates',
          'Sending booking confirmations, invoices, and travel documents',
          'Providing personalized travel recommendations and offers',
          'Responding to your enquiries and customer support requests',
          'Improving our website, services, and user experience',
          'Complying with legal obligations and resolving disputes',
          'Sending promotional emails and newsletters (with your consent)',
        ],
      },
    ],
  },
  {
    icon: Shield,
    title: 'Data Protection & Security',
    content: [
      {
        text: 'We implement industry-standard security measures to protect your personal data:',
        list: [
          'SSL/TLS encryption for all data transmissions',
          'Secure payment processing through trusted third-party gateways',
          'Access controls limiting data access to authorized personnel only',
          'Regular security audits and vulnerability assessments',
          'Encrypted storage of sensitive personal information',
        ],
      },
      {
        text: 'While we strive to protect your data, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security but are committed to maintaining the highest practical standards.',
      },
    ],
  },
  {
    icon: Server,
    title: 'Data Sharing & Third Parties',
    content: [
      {
        text: 'We may share your personal information with trusted third parties only when necessary:',
        list: [
          'Hotel partners, transport providers, and local guides to fulfill your tour bookings',
          'Payment processors for secure transaction processing',
          'Government authorities when required by law (e.g., immigration or visa requirements)',
          'Analytics services (such as Google Analytics) to improve our website',
          'Email service providers for sending booking confirmations and newsletters',
        ],
      },
      {
        text: 'We do not sell, rent, or trade your personal information to third parties for their marketing purposes. All third-party partners are bound by data protection agreements.',
      },
    ],
  },
  {
    icon: Cookie,
    title: 'Cookies & Tracking',
    content: [
      {
        text: 'Our website uses cookies and similar technologies to enhance your browsing experience:',
        list: [
          'Essential cookies — required for website functionality and security',
          'Analytics cookies — help us understand website usage and improve performance',
          'Preference cookies — remember your settings and personalization choices',
          'Marketing cookies — used to deliver relevant advertisements (if applicable)',
        ],
      },
      {
        text: 'You can manage cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website.',
      },
    ],
  },
  {
    icon: UserCheck,
    title: 'Your Rights',
    content: [
      {
        text: 'You have the following rights regarding your personal data:',
        list: [
          'Right to access — request a copy of the personal data we hold about you',
          'Right to correction — request correction of inaccurate or incomplete data',
          'Right to deletion — request deletion of your personal data (subject to legal obligations)',
          'Right to withdraw consent — opt out of marketing communications at any time',
          'Right to data portability — receive your data in a structured, machine-readable format',
          'Right to object — object to the processing of your personal data for specific purposes',
        ],
      },
      {
        text: 'To exercise any of these rights, please contact us using the details provided below. We will respond to your request within 30 days.',
      },
    ],
  },
  {
    icon: Mail,
    title: 'Data Retention',
    content: [
      {
        text: 'We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy:',
        list: [
          'Booking and transaction data — retained for 7 years as required by Indian tax laws',
          'Enquiry data — retained for 2 years after the last interaction',
          'Marketing preferences — retained until you withdraw consent',
          'Website analytics data — retained in anonymized form for up to 3 years',
        ],
      },
    ],
  },
];

export default async function PrivacyPolicyPage() {
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
              <Shield className="w-4 h-4" />
              Your Privacy Matters
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-stone-300 max-w-xl mx-auto">
              We are committed to protecting your personal information and being transparent
              about how we use it.
            </p>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-stone-50 border-b">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-stone-500">
              <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-stone-800 font-medium">Privacy Policy</span>
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
              {siteName} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website and provides
              tour and travel services across Rajasthan, India. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website or use our services.
              By using our website or booking our services, you agree to the practices described in this policy.
            </p>
          </div>
        </section>

        {/* Policy Sections */}
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
                    {section.content.map((block, bIdx) => (
                      <div key={bIdx}>
                        {block.subtitle && (
                          <h3 className="font-semibold text-stone-700 mb-2">{block.subtitle}</h3>
                        )}
                        {block.text && (
                          <p className="text-stone-600 leading-relaxed mb-2">{block.text}</p>
                        )}
                        {block.list && (
                          <ul className="space-y-1.5 ml-4">
                            {block.list.map((item, lIdx) => (
                              <li key={lIdx} className="flex items-start gap-2 text-stone-600 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Children's Privacy */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-800 mb-4">
              8. Children&apos;s Privacy
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not
              knowingly collect personal information from children. If you believe we have
              inadvertently collected data from a minor, please contact us immediately, and
              we will take steps to delete such information.
            </p>
          </div>

          {/* Policy Changes */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm mt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-800 mb-4">
              9. Changes to This Policy
            </h2>
            <p className="text-stone-600 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be
              posted on this page with an updated &quot;Last Updated&quot; date. We encourage
              you to review this policy periodically to stay informed about how we protect
              your information.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl p-6 sm:p-8 mt-10 text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              10. Contact Us
            </h2>
            <p className="text-stone-300 leading-relaxed mb-6">
              If you have any questions about this Privacy Policy or wish to exercise your
              data rights, please contact us:
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
            <Link href="/terms-conditions" className="text-sm text-amber-700 hover:text-amber-800 underline underline-offset-2">
              Terms & Conditions
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
