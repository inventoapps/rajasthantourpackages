'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

/**
 * Shared FAQ Accordion section used across listing pages.
 * Accepts faqs in either { question, answer } or { q, a } format.
 * @param {{ faqs: Array, badge?: string, title?: string, subtitle?: string, bg?: string }} props
 */
export default function FAQSection({
  faqs = [],
  badge = 'FAQs',
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about traveling in Rajasthan',
  bg = 'bg-stone-50',
}) {
  if (!faqs.length) return null;

  return (
    <section className={`py-16 sm:py-24 ${bg}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">{badge}</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">{title}</h2>
          <p className="text-stone-500 mt-2">{subtitle}</p>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-white rounded-xl border border-stone-200 px-5 shadow-sm"
            >
              <AccordionTrigger className="text-left font-semibold text-stone-800 hover:text-amber-700 py-4 text-sm sm:text-base">
                {faq.question || faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 text-sm leading-relaxed pb-4">
                {faq.answer || faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
