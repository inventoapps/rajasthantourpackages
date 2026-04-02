import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

/**
 * Shared page header with amber gradient background and breadcrumb.
 * 
 * @param {object} props
 * @param {string} props.title - Page heading
 * @param {string} props.subtitle - Text below heading
 * @param {Array<{label: string, href?: string}>} props.breadcrumbs - Breadcrumb items (last is current page)
 * @param {React.ReactNode} [props.children] - Optional content below subtitle (e.g. search bar)
 */
export default function PageHeader({ title, subtitle, breadcrumbs = [], children }) {
  return (
    <section className="relative pt-24 pb-12 bg-gradient-to-br from-amber-700 via-amber-600 to-orange-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-amber-200 mb-4">
            <Link href="/" className="hover:text-white flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="contents">
                <ChevronRight className="w-3.5 h-3.5" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white">{crumb.label}</Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{title}</h1>
        {subtitle && <p className="text-amber-100 text-lg mb-6">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
