'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Shared expandable SEO content section used on listing pages.
 * @param {{ heading: string, sections: Array<{title:string,content:string}>, expandedContent?: React.ReactNode, bgCard?: string, bgSection?: string }} props
 */
export default function SeoContentSection({
  heading = 'The Ultimate Guide',
  sections = [],
  expandedContent = null,
  bgCard = 'bg-stone-50',
  bgSection = 'bg-white',
}) {
  const [expanded, setExpanded] = useState(false);

  if (!sections.length) return null;

  return (
    <section className={`py-16 sm:py-20 ${bgSection}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
            {heading}
          </h2>
          <div className="w-20 h-1.5 bg-amber-500 rounded-full mt-4" />
        </div>
        <div className={`border-l-4 border-amber-500 ${bgCard} rounded-2xl shadow-md p-6 sm:p-8 lg:p-10`}>
          <div className={`relative ${!expanded ? 'max-h-[400px] overflow-hidden' : ''}`}>
            <div className="prose prose-lg max-w-none [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-stone-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-stone-600 [&_p]:leading-relaxed [&_p]:mb-5">
              {sections.map((sec, i) => (
                <div key={i}>
                  <h3>{sec.title}</h3>
                  <p>{sec.content}</p>
                </div>
              ))}
              {expanded && expandedContent}
            </div>
            {!expanded && (
              <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-${bgCard === 'bg-stone-50' ? 'stone-50' : 'white'} via-${bgCard === 'bg-stone-50' ? 'stone-50/90' : 'white/90'} to-transparent pointer-events-none`} />
            )}
          </div>
          <div className={`flex justify-start ${!expanded ? '-mt-4 relative z-10' : 'mt-6'}`}>
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-semibold text-sm transition-colors"
            >
              {expanded ? (
                <>Show less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Continue reading <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
