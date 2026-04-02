'use client';

import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * Shared Testimonials section used across listing pages.
 * @param {{ reviews: Array, badge?: string, title?: string, subtitle?: string, bg?: string }} props
 */
export default function TestimonialsSection({
  reviews = [],
  badge = 'Testimonials',
  title = 'Loved by 50,000+ Travelers',
  subtitle = 'See what our guests have to say about their Rajasthan experience',
  bg = 'bg-stone-50',
}) {
  if (!reviews.length) return null;

  return (
    <section className={`py-16 sm:py-24 ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">{badge}</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">{title}</h2>
          <p className="text-stone-500 mt-3">{subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((r) => (
            <Card key={r.id} className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(r.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-4 italic">
                &quot;{r.comment}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                  {r.name?.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-stone-900 text-sm">{r.name}</p>
                  <p className="text-xs text-stone-400">
                    {new Date(r.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
