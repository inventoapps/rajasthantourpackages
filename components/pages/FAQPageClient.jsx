'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, Phone, Search } from 'lucide-react';

/**
 * Thin client wrapper for the FAQ page.
 * Receives all FAQ data as props (server-rendered for SEO),
 * adds client-side search filtering and accordion interactivity.
 */
export default function FAQPageClient({ categories = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (catIdx, faqIdx) => {
    const key = `${catIdx}-${faqIdx}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      faqs: cat.faqs.filter(
        (faq) =>
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.faqs.length > 0);

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white py-20 sm:py-28">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-amber-300 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            We&apos;re Here to Help
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-stone-300 max-w-xl mx-auto mb-8">
            Find quick answers to the most common questions about our tours, bookings, and travel
            services.
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search your question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-stone-50 border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-stone-500">
            <Link href="/" className="hover:text-amber-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-stone-800 font-medium">FAQs</span>
          </nav>
        </div>
      </div>

      {/* FAQ Categories */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <HelpCircle className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-stone-800 mb-2">No results found</h2>
            <p className="text-stone-500 mb-6">
              We couldn&apos;t find any questions matching &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-amber-700 hover:text-amber-800 font-medium underline underline-offset-2"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {filteredCategories.map((cat, catIdx) => (
              <div key={catIdx}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{cat.emoji}</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-800">{cat.name}</h2>
                  <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">
                    {cat.faqs.length} {cat.faqs.length === 1 ? 'question' : 'questions'}
                  </span>
                </div>
                <div className="space-y-3">
                  {cat.faqs.map((faq, faqIdx) => {
                    const key = `${catIdx}-${faqIdx}`;
                    const isOpen = openItems[key];
                    return (
                      <div
                        key={faqIdx}
                        className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(catIdx, faqIdx)}
                          className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-stone-50 transition-colors"
                        >
                          <span className="font-medium text-stone-800 text-sm sm:text-base">
                            {faq.q}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 -mt-1">
                            <div className="border-t border-stone-100 pt-4">
                              <p className="text-stone-600 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-12 bg-amber-50 border-t border-amber-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-stone-800 mb-3">Still Have Questions?</h2>
          <p className="text-stone-600 mb-6">
            Can&apos;t find what you&apos;re looking for? Our travel experts are always happy to help.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-amber-900/20 text-sm"
            >
              Contact Us
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 px-6 py-3 border border-amber-300 text-amber-800 hover:bg-amber-100 rounded-full font-medium transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-8 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/terms-conditions"
              className="text-sm text-amber-700 hover:text-amber-800 underline underline-offset-2"
            >
              Terms & Conditions
            </Link>
            <span className="text-stone-300">|</span>
            <Link
              href="/cancellation-policy"
              className="text-sm text-amber-700 hover:text-amber-800 underline underline-offset-2"
            >
              Cancellation & Refund Policy
            </Link>
            <span className="text-stone-300">|</span>
            <Link
              href="/privacy-policy"
              className="text-sm text-amber-700 hover:text-amber-800 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            <span className="text-stone-300">|</span>
            <Link
              href="/disclaimer"
              className="text-sm text-amber-700 hover:text-amber-800 underline underline-offset-2"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
