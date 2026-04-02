/**
 * Shared Brand Trust Bar — consistent stats across all pages.
 * Single source of truth for trust numbers.
 */
export const TRUST_STATS = [
  { n: '50,000+', l: 'Happy Travelers' },
  { n: '15+', l: 'Years Experience' },
  { n: '4.9/5', l: 'Customer Rating' },
  { n: '200+', l: 'Tour Packages' },
];

export default function BrandTrustBar() {
  return (
    <section className="py-12 bg-white border-t border-stone-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {TRUST_STATS.map((s) => (
            <div key={s.l}>
              <p className="text-2xl sm:text-3xl font-bold text-amber-600">{s.n}</p>
              <p className="text-xs text-stone-500 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
