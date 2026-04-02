import Link from 'next/link';
import { getSiteSettings, getPackages, getBlogs } from '@/lib/public-content';
import DynamicHeaderClient from '@/components/shared/DynamicHeaderClient';
import { getNavData } from '@/lib/public-content';

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or has been moved. Browse our Rajasthan tour packages and travel guides.',
  robots: { index: false, follow: true },
};

export const revalidate = 3600; // re-generate 404 page at most once per hour

export default async function NotFound() {
  let siteSettings = null;
  let popularPackages = [];
  let recentBlogs = [];
  let navData = { tours: [], blogs: [], destinations: [] };

  try {
    [siteSettings, popularPackages, recentBlogs, navData] = await Promise.all([
      getSiteSettings(),
      getPackages({ featured: true, limit: 4 }),
      getBlogs({ published: true, limit: 3 }),
      getNavData(),
    ]);
  } catch {
    // Graceful fallback
  }

  const siteName = siteSettings?.site_name || 'Rajasthan Tours';
  const phone = siteSettings?.business_phone || '+91 98765 43210';
  const phoneHref = `tel:${phone.replace(/[\s\-()]/g, '')}`;

  return (
    <>
      <DynamicHeaderClient
        tours={navData.tours || []}
        blogs={navData.blogs || []}
        destinations={navData.destinations || []}
        siteSettings={siteSettings}
      />

      <main className="min-h-[70vh]">
        {/* Hero 404 Section */}
        <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white py-24 sm:py-32">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <p className="text-amber-400 text-8xl sm:text-9xl font-extrabold mb-4 leading-none">404</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Oops! This Page Has Vanished Like a Desert Mirage
            </h1>
            <p className="text-lg text-stone-300 mb-8 max-w-xl mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or may have been moved.
              Don&apos;t worry — there&apos;s plenty more to explore in Rajasthan!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-amber-900/30"
              >
                ← Back to Homepage
              </Link>
              <Link
                href="/tour-packages"
                className="inline-flex items-center px-6 py-3 border-2 border-white/30 text-white hover:bg-white/10 rounded-full font-medium transition-colors"
              >
                Browse Tour Packages
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border-2 border-white/30 text-white hover:bg-white/10 rounded-full font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-center mb-8 text-stone-800">
              Here are some helpful links to get you back on track
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Tour Packages', href: '/tour-packages', icon: '🏰' },
                { label: 'Travel Blog', href: '/blogs', icon: '📖' },
                { label: 'About Us', href: '/about', icon: '🙏' },
                { label: 'Contact', href: '/contact', icon: '📞' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex flex-col items-center gap-2 p-5 rounded-xl bg-stone-50 hover:bg-amber-50 hover:shadow-md transition-all text-center group"
                >
                  <span className="text-3xl">{link.icon}</span>
                  <span className="font-medium text-stone-700 group-hover:text-amber-700 text-sm">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Packages */}
        {popularPackages.length > 0 && (
          <section className="py-14 bg-stone-50">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-2 text-stone-800">
                Popular Tour Packages
              </h2>
              <p className="text-center text-stone-500 mb-8">
                Maybe one of these was what you were looking for?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {popularPackages.map((pkg) => (
                  <Link
                    key={pkg.slug}
                    href={`/tour-packages/${pkg.slug}`}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
                  >
                    {pkg.image_url && (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={pkg.image_url}
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-stone-800 group-hover:text-amber-700 transition-colors text-sm line-clamp-2">
                        {pkg.title}
                      </h3>
                      {pkg.duration && (
                        <p className="text-xs text-stone-500 mt-1">{pkg.duration}</p>
                      )}
                      {pkg.price && (
                        <p className="text-amber-700 font-bold text-sm mt-1">
                          ₹{Number(pkg.price).toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent Blogs */}
        {recentBlogs.length > 0 && (
          <section className="py-14 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-2 text-stone-800">
                Latest Travel Guides
              </h2>
              <p className="text-center text-stone-500 mb-8">
                Explore our travel blog for tips and inspiration
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {recentBlogs.map((blog) => (
                  <Link
                    key={blog.slug}
                    href={`/blogs/${blog.slug}`}
                    className="bg-stone-50 rounded-xl overflow-hidden hover:shadow-md transition-all group"
                  >
                    {blog.image_url && (
                      <div className="h-36 overflow-hidden">
                        <img
                          src={blog.image_url}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-stone-800 group-hover:text-amber-700 transition-colors text-sm line-clamp-2">
                        {blog.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-12 bg-amber-50 border-t border-amber-100">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-xl font-bold text-stone-800 mb-3">
              Need Help Finding Something?
            </h2>
            <p className="text-stone-600 mb-6">
              Our travel experts are happy to help you plan the perfect Rajasthan trip.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={phoneHref}
                className="inline-flex items-center px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition-colors text-sm"
              >
                📞 Call {phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-2.5 border border-amber-300 text-amber-800 hover:bg-amber-100 rounded-full font-medium transition-colors text-sm"
              >
                Send an Enquiry
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
