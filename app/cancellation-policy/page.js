import PublicHeader from '@/components/shared/PublicHeader';
import { buildMetadata } from '@/lib/seo-governance';
import { getSiteSettings } from '@/lib/public-content';
import Link from 'next/link';
import { CalendarX, Clock, RefreshCw, AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

export const revalidate = 300;

export const metadata = buildMetadata({
  title: 'Cancellation & Refund Policy - Rajasthan Tours',
  description:
    'Understand the cancellation and refund policy for Rajasthan Tours. Learn about cancellation timelines, refund procedures, and exception policies.',
  canonical: '/cancellation-policy',
});

export default async function CancellationPolicyPage() {
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
              <CalendarX className="w-4 h-4" />
              Transparent Policies
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">Cancellation & Refund Policy</h1>
            <p className="text-lg text-stone-300 max-w-xl mx-auto">
              We understand plans can change. Here&apos;s everything you need to know about
              cancellations and refunds.
            </p>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-stone-50 border-b">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-stone-500">
              <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-stone-800 font-medium">Cancellation & Refund Policy</span>
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
              At {siteName}, we strive to provide flexible booking options. However, cancellations
              involve costs that we cannot always recover from our service partners (hotels, transport,
              guides). This policy outlines the cancellation charges and refund process applicable to
              all tour bookings.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          {/* Cancellation Schedule — visual cards */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-amber-700" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-800">
                1. Cancellation Schedule
              </h2>
            </div>
            <p className="text-stone-600 mb-6 pl-0 sm:pl-14">
              Cancellation charges are calculated based on the number of days remaining before
              the scheduled tour start date:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-0 sm:pl-14">
              {/* 30+ days */}
              <div className="border-2 border-green-200 bg-green-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-800">30+ Days Before</span>
                </div>
                <p className="text-3xl font-extrabold text-green-700 mb-1">10%</p>
                <p className="text-sm text-green-700">of total cost or deposit amount, whichever is higher</p>
              </div>
              {/* 15-30 days */}
              <div className="border-2 border-amber-200 bg-amber-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-5 h-5 text-amber-600" />
                  <span className="font-bold text-amber-800">15–30 Days Before</span>
                </div>
                <p className="text-3xl font-extrabold text-amber-700 mb-1">25%</p>
                <p className="text-sm text-amber-700">of total tour cost</p>
              </div>
              {/* 7-14 days */}
              <div className="border-2 border-orange-200 bg-orange-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <span className="font-bold text-orange-800">7–14 Days Before</span>
                </div>
                <p className="text-3xl font-extrabold text-orange-700 mb-1">50%</p>
                <p className="text-sm text-orange-700">of total tour cost</p>
              </div>
              {/* Less than 7 / No show */}
              <div className="border-2 border-red-200 bg-red-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="font-bold text-red-800">Less than 7 Days / No Show</span>
                </div>
                <p className="text-3xl font-extrabold text-red-700 mb-1">100%</p>
                <p className="text-sm text-red-700">No refund applicable</p>
              </div>
            </div>
          </div>

          {/* Refund Process */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm mt-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 text-amber-700" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-800">
                2. Refund Process
              </h2>
            </div>
            <div className="space-y-3 pl-0 sm:pl-14">
              <ul className="space-y-2 ml-4">
                {[
                  'All cancellation requests must be submitted in writing via email or through our contact form.',
                  'The cancellation date is the date we receive your written request, not the date of verbal communication.',
                  'Approved refunds will be processed within 7–14 business days from the date of cancellation confirmation.',
                  'Refunds will be credited to the original payment method (bank account, card, or UPI).',
                  'Bank processing times may vary; please allow up to 5 additional business days for the amount to reflect in your account.',
                  'Transaction fees or payment gateway charges (if any) are non-refundable.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-stone-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modifications */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm mt-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <CalendarX className="w-5 h-5 text-amber-700" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-800">
                3. Tour Date Changes & Modifications
              </h2>
            </div>
            <div className="space-y-3 pl-0 sm:pl-14">
              <ul className="space-y-2 ml-4">
                {[
                  'One free date change is allowed if requested more than 30 days before the original tour start date (subject to availability).',
                  'Date changes requested within 30 days of the tour start date will be treated as a cancellation and re-booking, with applicable charges.',
                  'Changes to tour package type or destination may involve additional costs based on the new package pricing.',
                  'Name changes for travelers are permitted free of charge up to 7 days before the tour start date.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-stone-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cancellations by Us */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm mt-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-700" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-800">
                4. Cancellations by {siteName}
              </h2>
            </div>
            <div className="space-y-3 pl-0 sm:pl-14">
              <p className="text-stone-600 leading-relaxed mb-2">
                In rare circumstances, we may need to cancel a tour due to:
              </p>
              <ul className="space-y-2 ml-4 mb-4">
                {[
                  'Minimum group size not being met (for group tours)',
                  'Extreme weather conditions or natural disasters',
                  'Government advisories, curfews, or travel restrictions',
                  'Safety concerns for travelers',
                  'Unforeseen events beyond our control (force majeure)',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-stone-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm font-medium">
                  ✅ In such cases, we will offer a full refund or the option to reschedule the tour at
                  no additional cost. However, we are not liable for any incidental expenses incurred
                  by the traveler (e.g., flight tickets, visa fees).
                </p>
              </div>
            </div>
          </div>

          {/* Non-Refundable Items */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm mt-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <XCircle className="w-5 h-5 text-amber-700" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-800">
                5. Non-Refundable Items
              </h2>
            </div>
            <div className="space-y-3 pl-0 sm:pl-14">
              <p className="text-stone-600 leading-relaxed mb-2">
                The following are non-refundable under any circumstances:
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  'Visa fees, travel insurance premiums, and entry permits',
                  'Airline tickets or railway tickets booked as part of the package (subject to carrier policies)',
                  'Special event tickets, show bookings, or activity reservations already confirmed',
                  'Any services already utilized before cancellation',
                  'Peak season or festival surcharges',
                  'Payment gateway or transaction processing fees',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-stone-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How to Cancel */}
          <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl p-6 sm:p-8 mt-10 text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              How to Request a Cancellation
            </h2>
            <p className="text-stone-300 leading-relaxed mb-6">
              To cancel your booking, please contact us through any of the following channels.
              Remember to include your booking reference number and the name of the lead traveler.
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
            <Link href="/privacy-policy" className="text-sm text-amber-700 hover:text-amber-800 underline underline-offset-2">
              Privacy Policy
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
