'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import EnquiryForm from '@/components/EnquiryForm';
import { Phone, Menu, X, ChevronDown, MapPin, Clock, ArrowRight, BookOpen, Compass } from 'lucide-react';

/**
 * DynamicHeaderClient – renders the site header with hover dropdowns
 * for Tours and Blogs.  Receives lightweight nav data as props from
 * the server-rendered PublicHeader wrapper.
 *
 * Props:
 *   tours  – [{ title, slug, location, duration, category }]
 *   blogs  – [{ title, slug, category, image_url }]
 *   variant – "solid" (default white bg) | "transparent" (hero overlay)
 */
export default function DynamicHeaderClient({ tours = [], blogs = [], destinations = [], variant = 'solid', siteSettings = null }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const [mobileBlogsOpen, setMobileBlogsOpen] = useState(false);
  const [mobileDestsOpen, setMobileDestsOpen] = useState(false);

  useEffect(() => {
    if (variant !== 'transparent') return;
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, [variant]);

  const isTransparent = variant === 'transparent' && !scrolled;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Destinations', href: '/destinations', dropdown: 'destinations' },
    { label: 'Tour Packages', href: '/tour-packages', dropdown: 'tours' },
    { label: 'Blogs', href: '/blogs', dropdown: 'blogs' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          {siteSettings?.logo_url ? (
            <Image
              src={siteSettings.logo_url}
              alt={siteSettings.logo_alt || 'Rajasthan Tours'}
              width={siteSettings.logo_width || 160}
              height={siteSettings.logo_height || 50}
              className="h-8 sm:h-10 w-auto object-contain"
              priority
            />
          ) : (
            <span className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isTransparent ? 'text-white' : 'text-amber-700'
            }`}>
              <span className="text-amber-500">{siteSettings?.site_name?.split(' ')[0] || 'Rajasthan'}</span>{' '}
              {siteSettings?.site_name?.split(' ').slice(1).join(' ') || 'Tours'}
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link.dropdown ? (
              <DropdownItem
                key={link.href}
                link={link}
                tours={tours}
                blogs={blogs}
                destinations={destinations}
                isTransparent={isTransparent}
                pathname={pathname}
              />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-amber-700 bg-amber-50'
                    : isTransparent
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-stone-700 hover:text-amber-700 hover:bg-amber-50'
                }`}
              >
                {link.label}
              </Link>
            )
          )}

          <Dialog open={enquiryOpen} onOpenChange={setEnquiryOpen}>
            <DialogTrigger asChild>
              <Button className="ml-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full px-5 shadow-lg">
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                Get Quote
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Enquire Now</DialogTitle>
                <DialogDescription className="text-sm text-stone-500">
                  Send us your travel requirements and we&apos;ll get back to you shortly.
                </DialogDescription>
              </DialogHeader>
              <EnquiryForm />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen
            ? <X className={isTransparent ? 'text-white' : 'text-stone-800'} />
            : <Menu className={isTransparent ? 'text-white' : 'text-stone-800'} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg max-h-[80vh] overflow-y-auto">
          <Link href="/" className="block px-6 py-3 text-stone-700 hover:bg-amber-50 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>

          {/* Mobile Destinations Accordion */}
          <button
            className="w-full flex items-center justify-between px-6 py-3 text-stone-700 hover:bg-amber-50 font-medium"
            onClick={() => setMobileDestsOpen(!mobileDestsOpen)}
          >
            Destinations <ChevronDown className={`w-4 h-4 transition-transform ${mobileDestsOpen ? 'rotate-180' : ''}`} />
          </button>
          {mobileDestsOpen && (
            <div className="bg-amber-50/50 px-6 pb-2">
              {destinations.length > 0 ? destinations.map((d) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="block py-2 text-sm text-stone-600 hover:text-amber-700 border-b border-amber-100 last:border-0"
                  onClick={() => setMenuOpen(false)}
                  style={{ overflowWrap: 'anywhere' }}
                >
                  {d.name}
                  {d.tagline && <span className="text-xs text-stone-400 ml-2">• {d.tagline}</span>}
                </Link>
              )) : (
                <p className="text-sm text-stone-400 py-2">No destinations available</p>
              )}
              <Link
                href="/destinations"
                className="block py-2 text-sm font-semibold text-amber-700 hover:text-amber-800"
                onClick={() => setMenuOpen(false)}
              >
                View All Destinations →
              </Link>
            </div>
          )}

          {/* Mobile Tours Accordion */}
          <button
            className="w-full flex items-center justify-between px-6 py-3 text-stone-700 hover:bg-amber-50 font-medium"
            onClick={() => setMobileToursOpen(!mobileToursOpen)}
          >
            Tour Packages <ChevronDown className={`w-4 h-4 transition-transform ${mobileToursOpen ? 'rotate-180' : ''}`} />
          </button>
          {mobileToursOpen && (
            <div className="bg-amber-50/50 px-6 pb-2">
              {tours.length > 0 ? tours.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tour-packages/${t.slug}`}
                  className="block py-2 text-sm text-stone-600 hover:text-amber-700 border-b border-amber-100 last:border-0"
                  onClick={() => setMenuOpen(false)}
                  style={{ overflowWrap: 'anywhere' }}
                >
                  {t.title}
                  {t.location && <span className="text-xs text-stone-400 ml-2">• {t.location}</span>}
                </Link>
              )) : (
                <p className="text-sm text-stone-400 py-2">No tours available</p>
              )}
              <Link
                href="/tour-packages"
                className="block py-2 text-sm font-semibold text-amber-700 hover:text-amber-800"
                onClick={() => setMenuOpen(false)}
              >
                View All Tours →
              </Link>
            </div>
          )}

          {/* Mobile Blogs Accordion */}
          <button
            className="w-full flex items-center justify-between px-6 py-3 text-stone-700 hover:bg-amber-50 font-medium"
            onClick={() => setMobileBlogsOpen(!mobileBlogsOpen)}
          >
            Blogs <ChevronDown className={`w-4 h-4 transition-transform ${mobileBlogsOpen ? 'rotate-180' : ''}`} />
          </button>
          {mobileBlogsOpen && (
            <div className="bg-amber-50/50 px-6 pb-2">
              {blogs.length > 0 ? blogs.map((b) => (
                <Link
                  key={b.slug}
                  href={`/blogs/${b.slug}`}
                  className="block py-2 text-sm text-stone-600 hover:text-amber-700 border-b border-amber-100 last:border-0"
                  onClick={() => setMenuOpen(false)}
                  style={{ overflowWrap: 'anywhere' }}
                >
                  {b.title}
                </Link>
              )) : (
                <p className="text-sm text-stone-400 py-2">No blogs available</p>
              )}
              <Link
                href="/blogs"
                className="block py-2 text-sm font-semibold text-amber-700 hover:text-amber-800"
                onClick={() => setMenuOpen(false)}
              >
                View All Blogs →
              </Link>
            </div>
          )}

          <Link href="/about" className="block px-6 py-3 text-stone-700 hover:bg-amber-50 font-medium" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link href="/contact" className="block px-6 py-3 text-stone-700 hover:bg-amber-50 font-medium" onClick={() => setMenuOpen(false)}>Contact</Link>

          <div className="p-4">
            <Button
              className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-full"
              onClick={() => { setMenuOpen(false); setEnquiryOpen(true); }}
            >
              <Phone className="w-4 h-4 mr-2" /> Enquire Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Desktop Dropdown Item ---------- */
function DropdownItem({ link, tours, blogs, destinations, isTransparent, pathname }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const items = link.dropdown === 'tours' ? tours : link.dropdown === 'destinations' ? destinations : blogs;
  const isTours = link.dropdown === 'tours';
  const isDests = link.dropdown === 'destinations';

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={link.href}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          pathname?.startsWith(link.href)
            ? 'text-amber-700 bg-amber-50'
            : isTransparent
            ? 'text-white/90 hover:text-white hover:bg-white/10'
            : 'text-stone-700 hover:text-amber-700 hover:bg-amber-50'
        }`}
      >
        {link.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </Link>

      {open && items.length > 0 && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`bg-white rounded-xl shadow-2xl border border-stone-100 overflow-hidden ${isTours ? 'w-[420px]' : isDests ? 'w-[380px]' : 'w-[340px]'}`}>
            {/* Dropdown header */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 border-b border-amber-100">
              <h3 className="text-sm font-semibold text-amber-800 flex items-center gap-2">
                {isTours ? <Compass className="w-4 h-4" /> : isDests ? <MapPin className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                {isTours ? 'Our Tour Packages' : isDests ? 'Popular Destinations' : 'Latest Blog Posts'}
              </h3>
            </div>

            {/* Items list */}
            <ul className="py-1 max-h-[360px] overflow-y-auto">
              {items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={isTours ? `/tour-packages/${item.slug}` : isDests ? `/destinations/${item.slug}` : `/blogs/${item.slug}`}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-amber-50 transition-colors group"
                  >
                    {isDests && item.image_url && (
                      <img
                        src={item.image_url}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover shrink-0 mt-0.5"
                      />
                    )}
                    {!isTours && !isDests && item.image_url && (
                      <img
                        src={item.image_url}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover shrink-0 mt-0.5"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-800 group-hover:text-amber-700 truncate">
                        {isDests ? item.name : item.title}
                      </p>
                      {isTours && (
                        <div className="flex items-center gap-3 mt-0.5">
                          {item.location && (
                            <span className="text-xs text-stone-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />{item.location}
                            </span>
                          )}
                          {item.duration && (
                            <span className="text-xs text-stone-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />{item.duration}
                            </span>
                          )}
                        </div>
                      )}
                      {isDests && item.tagline && (
                        <span className="text-xs text-amber-600">{item.tagline}</span>
                      )}
                      {!isTours && !isDests && item.category && (
                        <span className="text-xs text-amber-600 capitalize">{item.category}</span>
                      )}
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-amber-600 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Footer link */}
            <div className="border-t border-stone-100 px-4 py-2.5 bg-stone-50">
              <Link
                href={link.href}
                className="text-sm font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                View All {isTours ? 'Tour Packages' : isDests ? 'Destinations' : 'Blog Posts'}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
