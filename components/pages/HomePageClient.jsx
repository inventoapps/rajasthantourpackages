import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star, Users, Phone, Mail, ChevronRight, Shield, Award, Headphones, IndianRupee, ArrowRight, Mountain, Compass, Camera, Heart, CheckCircle, Globe, Calendar, Sparkles, Send, Menu, X, TrendingUp, Briefcase, MapPinned, ThumbsUp, Lightbulb, Plane, Wallet, CircleDot } from 'lucide-react';
import { HOMEPAGE_FAQS } from '@/lib/data';
import EnquiryForm from '@/components/EnquiryForm';
import DynamicHeaderClient from '@/components/shared/DynamicHeaderClient';
import PackageCardsGridWithEnquiry from '@/components/shared/PackageCardsGridWithEnquiry';
import BlogCard from '@/components/shared/BlogCard';
import FAQSection from '@/components/shared/FAQSection';
import RichContentReadMore from '@/components/shared/RichContentReadMore';
import {
  IMG_ITINERARY_WEEKEND, IMG_ITINERARY_CLASSIC, IMG_ITINERARY_GRAND, IMG_ITINERARY_COMPLETE,
  IMG_CITY_DELHI, IMG_CITY_MUMBAI, IMG_CITY_BANGALORE, IMG_CITY_KOLKATA, IMG_CITY_AHMEDABAD, IMG_CITY_HYDERABAD,
  IMG_ABOUT_US, IMG_CTA_DESERT,
} from '@/lib/image-config';

const DESTINATIONS = [
  { name: 'Jaipur', tag: 'Pink City', img: 'https://images.unsplash.com/photo-1670254812851-e59013163aee?w=500&q=80' },
  { name: 'Udaipur', tag: 'City of Lakes', img: 'https://images.unsplash.com/photo-1601571574713-349e4e867fa6?w=500&q=80' },
  { name: 'Jaisalmer', tag: 'Golden City', img: 'https://images.unsplash.com/photo-1670687174580-c003b4716959?w=500&q=80' },
  { name: 'Jodhpur', tag: 'Blue City', img: 'https://images.unsplash.com/photo-1685790582503-1b2762d95407?w=500&q=80' },
  { name: 'Pushkar', tag: 'Sacred City', img: 'https://images.unsplash.com/photo-1637584498138-1f7122e48082?w=500&q=80' },
  { name: 'Ranthambore', tag: 'Tiger Country', img: 'https://images.unsplash.com/photo-1715264500941-27bf30bf46eb?w=500&q=80' },
];

const MARQUEE_KEYWORDS = [
  'Rajasthan Tour Packages',
  'Jaipur Heritage Tours',
  'Udaipur Lake Palace Stay',
  'Jaisalmer Desert Safari',
  'Jodhpur Blue City Tour',
  'Ranthambore Tiger Safari',
  'Golden Triangle Tour India',
  'Camel Safari Rajasthan',
  'Rajasthan Palace Hotel Stays',
  'Pushkar Fair Tour Package',
  'Honeymoon Packages Rajasthan',
  'Group Tours Rajasthan',
  'Customised Rajasthan Itinerary',
  'Cultural & Heritage Tours',
  'Wildlife Safari Packages',
  'Govt. Approved Tour Operator',
  'Rajasthan Tour from Delhi',
  'Rajasthan Tour from Mumbai',
  '7 Days Rajasthan Tour',
  'Luxury Rajasthan Holidays',
  'Budget Rajasthan Tour',
  'Solo Travel Rajasthan',
];

const ITINERARIES_BY_DURATION = [
  {
    days: '2–3',
    label: 'Weekend Getaway',
    route: 'Delhi → Jaipur → Ajmer → Pushkar',
    cities: ['Jaipur', 'Ajmer', 'Pushkar'],
    highlights: ['Amber Fort & City Palace', 'Pushkar Brahma Temple', 'Local bazaar shopping'],
    idealFor: 'First-timers, Weekend trips',
    startPrice: '4,999',
    color: 'amber',
    img: IMG_ITINERARY_WEEKEND,
    durationSlug: '3-day-rajasthan-tour-packages',
  },
  {
    days: '4–5',
    label: 'Classic Rajasthan',
    route: 'Jaipur → Jodhpur → Jaisalmer',
    cities: ['Jaipur', 'Jodhpur', 'Jaisalmer'],
    highlights: ['Mehrangarh Fort', 'Sam Sand Dunes camping', 'Golden Fort sunset'],
    idealFor: 'Couples, Families',
    startPrice: '8,999',
    color: 'orange',
    img: IMG_ITINERARY_CLASSIC,
    durationSlug: '5-day-rajasthan-tour-packages',
  },
  {
    days: '6–7',
    label: 'Grand Rajasthan',
    route: 'Jaipur → Jodhpur → Jaisalmer → Udaipur',
    cities: ['Jaipur', 'Jodhpur', 'Jaisalmer', 'Udaipur'],
    highlights: ['Desert safari & camping', 'Lake Pichola boat ride', 'Blue City heritage walk'],
    idealFor: 'In-depth explorers',
    startPrice: '14,999',
    color: 'rose',
    img: IMG_ITINERARY_GRAND,
    durationSlug: '7-day-rajasthan-tour-packages',
  },
  {
    days: '8–10',
    label: 'Complete Rajasthan Circuit',
    route: 'Delhi → Jaipur → Ranthambore → Jodhpur → Jaisalmer → Udaipur → Mount Abu',
    cities: ['Jaipur', 'Ranthambore', 'Jodhpur', 'Jaisalmer', 'Udaipur', 'Mount Abu'],
    highlights: ['Tiger safari at Ranthambore', 'Palace stays', 'Desert + Lakes + Wildlife'],
    idealFor: 'Full experience seekers',
    startPrice: '22,999',
    color: 'emerald',
    img: IMG_ITINERARY_COMPLETE,
    durationSlug: '10-day-rajasthan-tour-packages',
  },
];

const PACKAGES_BY_CITY = [
  {
    city: 'Delhi',
    distance: '280 km · 4-5 hrs by road',
    desc: 'The most popular starting point for Rajasthan tours. Excellent road and rail connectivity. Overnight trains and luxury buses run daily.',
    popular: ['Golden Triangle (3D)', 'Jaipur Weekend (2D)', 'Grand Rajasthan Circuit (8D)'],
    startPrice: '4,999',
    travelers: '25,000+',
    img: IMG_CITY_DELHI,
  },
  {
    city: 'Mumbai',
    distance: '1,150 km · 2hr flight',
    desc: 'Direct flights to Jaipur, Udaipur & Jodhpur. Perfect for long weekends. Most travelers prefer the Udaipur-first route for a royal start.',
    popular: ['Udaipur Romantic Escape (3D)', 'Royal Rajasthan (7D)', 'Jaipur Heritage (4D)'],
    startPrice: '9,999',
    travelers: '12,000+',
    img: IMG_CITY_MUMBAI,
  },
  {
    city: 'Bangalore',
    distance: '1,740 km · 2.5hr flight',
    desc: 'Direct flights to Jaipur. IT professionals love our 5-day packages during extended weekends. Palace stays and desert camps are top picks.',
    popular: ['Jaipur-Udaipur Combo (5D)', 'Desert Safari Special (4D)', 'Full Circuit (8D)'],
    startPrice: '11,999',
    travelers: '8,500+',
    img: IMG_CITY_BANGALORE,
  },
  {
    city: 'Kolkata',
    distance: '1,450 km · 2.5hr flight',
    desc: 'Direct flights available to Jaipur. The Durga Puja holiday week is peak booking season. Heritage and spiritual tours are most popular.',
    popular: ['Pushkar Spiritual (4D)', 'Heritage Triangle (5D)', 'Royal Rajasthan (7D)'],
    startPrice: '10,999',
    travelers: '6,200+',
    img: IMG_CITY_KOLKATA,
  },
  {
    city: 'Ahmedabad',
    distance: '650 km · 6-7 hrs by road',
    desc: 'Closest metro to Udaipur & Mount Abu. Many travellers combine Gujarat + Rajasthan. Self-drive trips are popular on this route.',
    popular: ['Mount Abu + Udaipur (3D)', 'Jaisalmer Desert (4D)', 'South Rajasthan (5D)'],
    startPrice: '5,999',
    travelers: '9,800+',
    img: IMG_CITY_AHMEDABAD,
  },
  {
    city: 'Hyderabad',
    distance: '1,350 km · 2hr flight',
    desc: 'Direct flights to Jaipur. Nizam heritage lovers enjoy the contrast with Rajput architecture. Group tours during Dussehra are a hit.',
    popular: ['Jaipur-Jodhpur Express (4D)', 'Luxury Palace Tour (6D)', 'Wildlife + Heritage (7D)'],
    startPrice: '10,999',
    travelers: '5,400+',
    img: IMG_CITY_HYDERABAD,
  },
];

const PLACES_TO_VISIT = [
  {
    name: 'Jaipur',
    title: 'The Pink City',
    details: 'Explore Amber Fort, City Palace, and Hawa Mahal while enjoying vibrant bazaars and royal architecture.',
    bestFor: 'History, architecture, shopping',
    idealStay: '2-3 days',
  },
  {
    name: 'Udaipur',
    title: 'The City of Lakes',
    details: 'Known for Lake Pichola, grand palaces, and romantic sunset boat rides with scenic Aravalli views.',
    bestFor: 'Couples, luxury stays, photography',
    idealStay: '2-3 days',
  },
  {
    name: 'Jaisalmer',
    title: 'The Golden City',
    details: 'Visit Jaisalmer Fort, Patwon Ki Haveli, and enjoy desert camping with cultural performances in Sam dunes.',
    bestFor: 'Desert safari, culture, adventure',
    idealStay: '2 days',
  },
  {
    name: 'Jodhpur',
    title: 'The Blue City',
    details: 'Discover Mehrangarh Fort, blue old-city lanes, and traditional Rajasthani food near Clock Tower market.',
    bestFor: 'Heritage walks, food, local culture',
    idealStay: '2 days',
  },
  {
    name: 'Pushkar',
    title: 'The Sacred Town',
    details: 'A spiritual destination with Brahma Temple, holy lake ghats, and a relaxed cafe culture.',
    bestFor: 'Spiritual travel, backpacking, fairs',
    idealStay: '1-2 days',
  },
  {
    name: 'Ranthambore',
    title: 'Tiger Reserve Escape',
    details: 'Famous for wildlife safaris and tiger sightings, plus historic Ranthambore Fort inside the park.',
    bestFor: 'Wildlife, family trips, nature',
    idealStay: '2 days',
  },
  {
    name: 'Mount Abu',
    title: 'Rajasthan Hill Station',
    details: 'Cool weather, Nakki Lake boating, and intricate marble carvings at Dilwara Jain Temples.',
    bestFor: 'Summer breaks, families, leisure',
    idealStay: '1-2 days',
  },
  {
    name: 'Bikaner',
    title: 'Land of Camels',
    details: 'Home to Junagarh Fort, camel farm experiences, and traditional snacks unique to Bikaneri cuisine.',
    bestFor: 'Offbeat heritage, food, culture',
    idealStay: '1-2 days',
  },
  {
    name: 'Chittorgarh',
    title: 'Fort of Valor',
    details: 'Visit India’s largest fort complex, Vijay Stambh, and sites linked to Rajput bravery legends.',
    bestFor: 'History enthusiasts, day excursions',
    idealStay: '1 day',
  },
];

function SeoContentSection({ content }) {
  return (
    <section className="section-padding bg-stone-50" data-testid="seo-content-section">
      <div className="max-w-5xl mx-auto">
        {/* Title with orange underline */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-stone-900 leading-tight">
            Rajasthan Tour Packages: Plan Your Perfect Trip with the Complete Rajasthan Travel Guide.
          </h2>
          <div className="w-20 h-1.5 bg-amber-500 rounded-full mt-4" />
        </div>

        {/* Article Card with left orange border */}
        <div className="border-l-4 border-amber-500 bg-white rounded-2xl shadow-md p-6 sm:p-8 lg:p-10">
          <RichContentReadMore
            html={content}
            contentClassName="seo-prose-content prose prose-lg max-w-none [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:text-stone-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-stone-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-stone-600 [&_p]:leading-relaxed [&_p]:mb-5 [&_a]:text-amber-700 hover:[&_a]:text-amber-800 [&_strong]:text-stone-800 [&_strong]:font-bold [&_li]:text-stone-600 [&_li]:mb-2 [&_ul]:mb-5 [&_ol]:mb-5 [&_img]:rounded-xl [&_img]:shadow-lg [&_blockquote]:border-l-4 [&_blockquote]:border-amber-500 [&_blockquote]:pl-4 [&_blockquote]:text-stone-600 [&_blockquote]:italic"
          />
        </div>
      </div>
    </section>
  );
}

export default function HomePage({
  featuredPkgs = [],
  allPkgs = [],
  blogs = [],
  reviews = [],
  homepageSettings = {},
  navTours = [],
  navBlogs = [],
  navDestinations = [],
  siteSettings = null,
  destinations = [],
}) {
  const phone = siteSettings?.business_phone || '+91 98765 43210';
  const phoneHref = `tel:${phone.replace(/[\s\-()]/g, '')}`;

  const adventurePkgs = allPkgs.filter(p => ['adventure', 'wildlife'].includes(p.category)).slice(0, 3);
  const heritagePkgs = allPkgs.filter(p => ['heritage', 'premium', 'luxury'].includes(p.category)).slice(0, 3);

  return (
    <div className="min-h-screen" data-testid="homepage">
      <DynamicHeaderClient tours={navTours} blogs={navBlogs} destinations={navDestinations} variant="transparent" siteSettings={siteSettings} />
      <main id="main-content">
      {/* ===== HERO ===== */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center" data-testid="hero-section" aria-label="Rajasthan tour packages hero banner">
        <div className="absolute inset-0"><Image src={homepageSettings.hero_image_url || "https://images.unsplash.com/photo-1724382981275-f144e3a12cdb?w=1600&q=80"} alt={homepageSettings.hero_image_alt || "Rajasthan Tour Packages - Royal Forts, Desert Safaris and Palace Stays"} fill priority sizes="100vw" className="w-full h-full object-cover" /><div className="absolute inset-0 hero-gradient" /></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl">
            <Badge className="bg-amber-500/20 text-amber-200 border border-amber-400/30 mb-5 text-xs font-medium px-3 py-1">Trusted by 50,000+ Travelers</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5">
              {homepageSettings.hero_title ? (
                homepageSettings.hero_title.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < homepageSettings.hero_title.split('\n').length - 1 && <br />}
                  </span>
                ))
              ) : (
                <>
                  Discover the<br /><span className="text-gradient bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">Royal Rajasthan</span>
                </>
              )}
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-lg">{homepageSettings.hero_subtitle || "Explore magnificent forts, shimmering lakes, golden deserts, and centuries of heritage with our expertly crafted tour packages."}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tour-packages"><Button className="bg-amber-600 hover:bg-amber-700 text-white px-7 py-6 text-base rounded-full shadow-xl shadow-amber-900/30" data-testid="hero-explore-btn">{homepageSettings.hero_button_text || "Explore Packages"} <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
              <Link href="/contact"><Button className="border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white px-7 py-6 text-base rounded-full backdrop-blur-sm" data-testid="hero-contact-btn"><Phone className="w-4 h-4 mr-2" />{homepageSettings.hero_secondary_button_text || "Free Consultation"}</Button></Link>
            </div>
            <div className="flex items-center gap-6 mt-10 text-white/70 text-sm">
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-amber-400" />Best Price Guarantee</span>
              <span className="flex items-center gap-1.5"><Headphones className="w-4 h-4 text-amber-400" />24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEO KEYWORD MARQUEE ===== */}
      <div
        className="bg-stone-900 border-b border-stone-800 flex items-stretch"
        aria-label="Popular Rajasthan tour categories and destinations"
      >
        {/* Static amber "Explore" label — outside the overflow container so it never gets clipped */}
        <div className="shrink-0 bg-amber-600 flex items-center gap-2 px-5 py-3 text-white font-bold text-xs sm:text-sm tracking-widest uppercase z-10">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>Explore</span>
        </div>

        {/* Scroll track — overflow-hidden scoped only here */}
        <div className="flex-1 overflow-hidden relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-stone-900 to-transparent z-10 pointer-events-none" />
          <div className="kw-marquee flex whitespace-nowrap">
            {[0, 1].map((gi) => (
              <div key={gi} className="flex items-center shrink-0" aria-hidden={gi === 1 ? 'true' : undefined}>
                {MARQUEE_KEYWORDS.map((kw, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-medium text-stone-300 tracking-wide hover:text-amber-400 transition-colors cursor-default"
                  >
                    <span className="text-amber-500/70 text-[10px] leading-none select-none">✦</span>
                    {kw}
                  </span>
                ))}
              </div>
            ))}
          </div>
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-stone-900 to-transparent z-10 pointer-events-none" />
        </div>
      </div>

      {/* ===== ABOUT US ===== */}
      <section className="section-padding bg-stone-50" data-testid="about-section" aria-labelledby="about-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">About Us</Badge>
              <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold text-stone-900 mb-5">Rajasthan’s Most Trusted Tour Operator Since 2010</h2>
              <p className="text-stone-600 leading-relaxed mb-5">For over 15 years, we have been crafting unforgettable travel experiences across the Land of Kings. Our deep local knowledge, hand-picked hotels, and passionate guides ensure every trip is extraordinary.</p>
              <p className="text-stone-600 leading-relaxed mb-8">From the golden dunes of Jaisalmer to the serene lakes of Udaipur, from thrilling wildlife safaris to opulent palace stays — we design journeys that touch your soul.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[{ n: '15+', l: 'Years Experience' }, { n: '50K+', l: 'Happy Travelers' }, { n: '200+', l: 'Tour Packages' }, { n: '4.9', l: 'Star Rating' }].map(s => (
                  <div key={s.l} className="text-center p-4 bg-white rounded-xl shadow-sm"><p className="text-2xl font-bold text-amber-600">{s.n}</p><p className="text-xs text-stone-500 mt-1">{s.l}</p></div>
                ))}
              </div>
              <Link href="/about"><Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 rounded-full px-6">Learn More About Us <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
            </div>
            <div className="relative">
              {IMG_ABOUT_US && (
                <div className="rounded-2xl overflow-hidden shadow-2xl relative h-[420px]">
                    <Image
                      src={IMG_ABOUT_US}
                      alt="Expert Rajasthan tour guides at Amber Fort Jaipur - trusted operator since 2010"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized
                      className="object-cover"
                    />
                </div>
              )}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center"><Award className="w-6 h-6 text-amber-600" /></div>
                <div><p className="font-bold text-stone-900 text-sm">Government Approved</p><p className="text-xs text-stone-500">Dept. of Tourism, Rajasthan</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PACKAGES ===== */}
      <section className="section-padding bg-white" data-testid="featured-packages-section" aria-labelledby="featured-packages-heading">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">Most Popular</Badge>
              <h2 id="featured-packages-heading" className="text-3xl sm:text-4xl font-bold text-stone-900">Featured Rajasthan Tour Packages</h2>
            </div>
            <Link href="/tour-packages"><Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 rounded-full">View All Packages <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
          <PackageCardsGridWithEnquiry packages={featuredPkgs.slice(0, 6)} />
        </div>
      </section>

      {/* ===== SEO CONTENT (from Admin) ===== */}
      {homepageSettings.seo_content && (
        <SeoContentSection content={homepageSettings.seo_content} />
      )}

      {/* ===== DESTINATIONS ===== */}
      <section className="section-padding bg-white" data-testid="destinations-section" aria-labelledby="destinations-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">Popular Destinations</Badge>
            <h2 id="destinations-heading" className="text-3xl sm:text-4xl font-bold text-stone-900">Explore Rajasthan&apos;s Iconic Cities</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {(destinations.length > 0 ? destinations.slice(0, 6) : DESTINATIONS).map(d => {
              const name = d.name;
              const tag = d.tagline || d.tag;
              const img = d.image_url || d.img;
              const slug = d.slug;
              const href = slug ? `/destinations/${slug}` : `/tour-packages?search=${name}`;
              return (
                <Link key={name} href={href} className="group">
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] card-hover">
                    <Image src={img} alt={name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <p className="font-bold text-white text-sm">{name}</p>
                      <p className="text-amber-300 text-xs">{tag}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {destinations.length > 0 && (
            <div className="text-center mt-8">
              <Link href="/destinations">
                <Button variant="outline" className="rounded-full border-amber-300 text-amber-700 hover:bg-amber-50 font-semibold">
                  View All Destinations <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ===== PLACES TO VISIT ===== */}
      <section className="section-padding bg-stone-50" data-testid="places-to-visit-section" aria-labelledby="places-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">Travel Guide</Badge>
            <h2 id="places-heading" className="text-3xl sm:text-4xl font-bold text-stone-900">Places to Visit in Rajasthan</h2>
            <p className="text-stone-500 mt-3 max-w-3xl mx-auto">
              Top destinations across Rajasthan with quick planning details to help you choose the right route and trip style.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(destinations.length > 0
              ? destinations.map(d => ({
                  name: d.name,
                  title: d.tagline,
                  details: d.description?.slice(0, 160) + '...',
                  bestFor: (d.key_attractions || []).slice(0, 3).map(a => a.name).join(', ') || 'Heritage, Culture',
                  idealStay: d.best_time_to_visit || 'Year round',
                  slug: d.slug,
                }))
              : PLACES_TO_VISIT
            ).map((place) => (
              <Link key={place.name} href={place.slug ? `/destinations/${place.slug}` : `/tour-packages?search=${place.name}`}>
                <Card className="p-6 border-0 shadow-md card-hover h-full hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xl font-bold text-stone-900">{place.name}</p>
                      <p className="text-sm text-amber-700 font-medium">{place.title}</p>
                    </div>
                    <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed mb-4">{place.details}</p>
                  <div className="space-y-1.5 text-sm">
                    <p><span className="font-semibold text-stone-800">Best for:</span> <span className="text-stone-600">{place.bestFor}</span></p>
                    <p><span className="font-semibold text-stone-800">{place.slug ? 'Best time:' : 'Ideal stay:'}</span> <span className="text-stone-600">{place.idealStay}</span></p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA 1: GET FREE QUOTE ===== */}
      <section className="relative py-20 overflow-hidden" data-testid="cta-1-section" aria-label="Plan your Rajasthan trip - request a free quote">
        <div className="absolute inset-0">{IMG_CTA_DESERT && <Image src={IMG_CTA_DESERT} alt="Sam Sand Dunes Jaisalmer - Rajasthan desert safari at sunset" fill sizes="100vw" unoptimized className="w-full h-full object-cover" />}<div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 via-amber-800/80 to-orange-900/90" /></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Plan Your Dream Rajasthan Trip</h2>
              <p className="text-amber-100/80 text-lg mb-6">Tell us your preferences and our travel experts will craft a personalized itinerary just for you. Free consultation, no obligations!</p>
              <div className="flex flex-wrap gap-4 text-sm text-amber-200">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" />Customized Itinerary</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" />Best Price Match</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" />24hr Response</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold text-lg mb-4">Get a Free Quote</h3>
              <EnquiryForm compact />
            </div>
          </div>
        </div>
      </section>

      {/* ===== ITINERARIES BY DURATION ===== */}
      <section className="section-padding bg-stone-50" data-testid="itineraries-duration-section" aria-labelledby="itineraries-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3"><Calendar className="w-3 h-3 mr-1 inline" />Plan by Duration</Badge>
            <h2 id="itineraries-heading" className="text-3xl sm:text-4xl font-bold text-stone-900">Rajasthan Tour Packages by Duration</h2>
            <p className="text-stone-500 mt-3 max-w-2xl mx-auto">Whether you have a weekend or a full week, we have the perfect Rajasthan itinerary for every schedule.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ITINERARIES_BY_DURATION.map((it) => (
              <Card key={it.days} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                {/* Image Header */}
                {it.img && (
                <div className="relative h-40 overflow-hidden">
                  <Image src={it.img} alt={`${it.days} Days Rajasthan Tour`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" unoptimized className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white text-stone-800 border-0 shadow font-bold text-sm">{it.days} Days</Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-lg">{it.label}</p>
                  </div>
                </div>
                )}

                <CardContent className="p-5 flex-1 flex flex-col">
                  {/* Route */}
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-stone-700 font-medium leading-snug">{it.route}</p>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-4 flex-1">
                    {it.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />{h}
                      </li>
                    ))}
                  </ul>

                  {/* Ideal For */}
                  <p className="text-xs text-stone-400 mb-3"><span className="font-semibold text-stone-600">Ideal for:</span> {it.idealFor}</p>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <div>
                      <p className="text-xs text-stone-400">Starting from</p>
                      <p className="text-lg font-bold text-amber-700">₹{it.startPrice}<span className="text-xs text-stone-400 font-normal">/person</span></p>
                    </div>
                    <Link href={`/tour-packages/${it.durationSlug}`}>
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs px-4">View Tours</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SEO descriptive text */}
          <div className="mt-10 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-100">
            <p className="text-stone-600 leading-relaxed text-sm">
              <strong className="text-stone-800">Finding the right Rajasthan tour package by duration</strong> is the first step to a perfect trip. A <strong>2–3 day Rajasthan tour</strong> is ideal for a quick Jaipur weekend escape covering Amber Fort, Hawa Mahal, and the local bazaars. A <strong>4–5 day tour</strong> lets you explore the desert magic of Jaisalmer and the blue city of Jodhpur. For the <strong>6–7 day classic Rajasthan circuit</strong>, you can cover Jaipur, Jodhpur, Jaisalmer, and Udaipur — the most popular route. And for the complete experience, our <strong>8–10 day Rajasthan package</strong> covers everything from tiger safaris at Ranthambore to palace stays in Udaipur and desert camping in Sam dunes.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ADVENTURE PACKAGES ===== */}
      {adventurePkgs.length > 0 && (
        <section className="section-padding bg-white" data-testid="adventure-packages-section" aria-labelledby="adventure-packages-heading">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
              <div>
                <Badge className="bg-green-50 text-green-700 border-green-200 mb-3"><Compass className="w-3 h-3 mr-1 inline" />Adventure & Wildlife</Badge>
                <h2 id="adventure-packages-heading" className="text-3xl sm:text-4xl font-bold text-stone-900">Popular Tour Packages for Rajasthan</h2>
                <p className="text-stone-500 mt-2">Desert safaris, tiger spotting, and adrenaline-pumping experiences</p>
              </div>
              <Link href="/tour-packages?category=adventure"><Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 rounded-full">View Adventure Tours <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
            </div>
            <PackageCardsGridWithEnquiry packages={adventurePkgs} />
          </div>
        </section>
      )}

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section-padding bg-stone-50" data-testid="why-choose-section" aria-labelledby="why-choose-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">Why Travelers Choose Us</Badge>
            <h2 id="why-choose-heading" className="text-3xl sm:text-4xl font-bold text-stone-900">Why Choose Rajasthan Tour Packages Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Best Price Guarantee', desc: 'We match any legitimate competitor price. Get the best value for your money.' },
              { icon: Users, title: 'Expert Local Guides', desc: 'Our passionate, certified guides bring centuries of history alive with stories.' },
              { icon: Headphones, title: '24/7 Support', desc: 'Round-the-clock assistance before, during, and after your trip.' },
              { icon: Heart, title: 'Tailored Experiences', desc: 'Every itinerary is customized to match your interests and pace.' },
            ].map(f => (
              <Card key={f.title} className="p-6 border-0 shadow-md text-center card-hover">
                <div className="w-14 h-14 mx-auto mb-4 bg-amber-50 rounded-2xl flex items-center justify-center"><f.icon className="w-7 h-7 text-amber-600" /></div>
                <h3 className="font-bold text-stone-900 mb-2">{f.title}</h3>
                <p className="text-sm text-stone-500">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA 2: SPECIAL OFFER ===== */}
      <section className="relative py-16 overflow-hidden bg-amber-600" data-testid="cta-2-section" aria-label="Limited time offer - book group tours and save 20%">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4"><Sparkles className="w-5 h-5 text-amber-200" /><span className="text-amber-200 font-medium text-sm uppercase tracking-wide">Limited Time Offer</span></div>
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3">Book Now &amp; Get 20% Off on Group Tours!</h3>
          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">Groups of 5 or more get exclusive discounts on all our premium packages. Plus free airport transfers and complimentary city guide!</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/tour-packages"><Button className="bg-white text-amber-700 hover:bg-amber-50 px-8 py-6 text-base rounded-full font-semibold shadow-xl" data-testid="cta-2-btn"><Calendar className="w-4 h-4 mr-2" />Book Your Group Tour</Button></Link>
            <a href={phoneHref} rel="noopener noreferrer"><Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base rounded-full"><Phone className="w-4 h-4 mr-2" />Call: {phone}</Button></a>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding bg-white" data-testid="testimonials-section" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">Testimonials</Badge>
            <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold text-stone-900">What Our Travelers Say</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map(r => (
              <Card key={r.id} className="p-6 border-0 shadow-md card-hover">
                <div className="flex items-center gap-1 mb-3">{[...Array(r.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-stone-600 text-sm leading-relaxed mb-4 italic">"{r.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">{r.name?.charAt(0)}</div>
                  <div><p className="font-semibold text-stone-900 text-sm">{r.name}</p><p className="text-xs text-stone-400">{new Date(r.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HERITAGE PACKAGES ===== */}
      {heritagePkgs.length > 0 && (
        <section className="section-padding bg-stone-50" data-testid="heritage-packages-section" aria-labelledby="heritage-heading">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
              <div>
                <Badge className="bg-rose-50 text-rose-700 border-rose-200 mb-3"><Mountain className="w-3 h-3 mr-1 inline" />Heritage & Luxury</Badge>
                <h2 id="heritage-heading" className="text-3xl sm:text-4xl font-bold text-stone-900">Royal Heritage Experiences</h2>
                <p className="text-stone-500 mt-2">Palace stays, fort explorations, and regal Rajasthani culture</p>
              </div>
              <Link href="/tour-packages?category=heritage"><Button variant="outline" className="border-rose-300 text-rose-700 hover:bg-rose-50 rounded-full">View Heritage Tours <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
            </div>
            <PackageCardsGridWithEnquiry packages={heritagePkgs} />
          </div>
        </section>
      )}

      {/* ===== PACKAGES BY CITY ===== */}
      <section className="section-padding bg-white" data-testid="packages-by-city-section" aria-labelledby="city-packages-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-blue-50 text-blue-700 border-blue-200 mb-3"><Plane className="w-3 h-3 mr-1 inline" />Packages by City</Badge>
            <h2 id="city-packages-heading" className="text-3xl sm:text-4xl font-bold text-stone-900">Rajasthan Tour Packages from Your City</h2>
            <p className="text-stone-500 mt-3 max-w-2xl mx-auto">Explore ready-made Rajasthan tour packages departing from major Indian cities with the best routes and prices.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGES_BY_CITY.map((c) => (
              <Card key={c.city} className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                {/* City Image */}
                {c.img && (
                <div className="relative h-36 overflow-hidden">
                  <Image src={c.img} alt={`Rajasthan tour from ${c.city}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <p className="text-white font-bold text-xl">From {c.city}</p>
                    <p className="text-white/70 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{c.distance}</p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-stone-800 border-0 text-xs shadow"><Users className="w-3 h-3 mr-1 inline" />{c.travelers} booked</Badge>
                  </div>
                </div>
                )}

                <CardContent className="p-5 flex-1 flex flex-col">
                  <p className="text-sm text-stone-600 leading-relaxed mb-4">{c.desc}</p>

                  {/* Popular Packages */}
                  <div className="mb-4 flex-1">
                    <p className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">Popular Packages</p>
                    <ul className="space-y-1.5">
                      {c.popular.map((p, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-stone-600">
                          <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />{p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <div>
                      <p className="text-xs text-stone-400">Starting from</p>
                      <p className="text-lg font-bold text-amber-700">₹{c.startPrice}<span className="text-xs text-stone-400 font-normal">/person</span></p>
                    </div>
                    <Link href="/tour-packages">
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs px-4">Explore</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SEO descriptive text */}
          <div className="mt-10 bg-stone-50 rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-100">
            <p className="text-stone-600 leading-relaxed text-sm">
              <strong className="text-stone-800">Rajasthan tour packages from Delhi</strong> are the most popular, with a quick 4–5 hour drive to Jaipur. <strong>Rajasthan packages from Mumbai</strong> offer direct flights to Jaipur, Udaipur, and Jodhpur — ideal for 5–7 day trips. Travelers from <strong>Bangalore, Hyderabad, and Kolkata</strong> can take advantage of direct flights and combine multiple cities in a single trip. From <strong>Ahmedabad</strong>, the proximity to Udaipur and Mount Abu makes it perfect for short 3–4 day getaways. No matter where you start, our expert-planned itineraries ensure the best experience with seamless transfers, handpicked hotels, and knowledgeable local guides.
            </p>
          </div>
        </div>
      </section>

      {/* ===== BLOGS ===== */}
      <section className="section-padding bg-white" data-testid="blogs-section" aria-labelledby="blogs-heading">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">Travel Journal</Badge>
              <h2 id="blogs-heading" className="text-3xl sm:text-4xl font-bold text-stone-900">Latest from Our Blog</h2>
            </div>
            <Link href="/blogs"><Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 rounded-full">View All Posts <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map(b => <BlogCard key={b.id} blog={b} />)}
          </div>
        </div>
      </section>

      {/* ===== FAQS ===== */}
      <FAQSection
        faqs={HOMEPAGE_FAQS}
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about traveling in Rajasthan"
        bg="bg-stone-50"
      />

      {/* ===== HOW TO PLAN ===== */}
      <section className="section-padding bg-white" data-testid="how-to-plan-section" aria-labelledby="how-to-plan-heading">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3"><Lightbulb className="w-3 h-3 mr-1 inline" />Planning Guide</Badge>
            <h2 id="how-to-plan-heading" className="text-3xl sm:text-4xl font-bold text-stone-900">How to Plan Rajasthan Tour Package</h2>
            <p className="text-stone-500 mt-3 max-w-3xl">Follow these simple steps to create the perfect Rajasthan itinerary — from picking the right season to booking trusted local experiences.</p>
          </div>

          {/* Steps Timeline */}
          <ol className="space-y-0 list-none" aria-label="Step-by-step guide to plan your Rajasthan tour">
            {[
              {
                step: '01',
                title: 'Choose the Best Time to Visit',
                desc: 'October to March is the ideal season for Rajasthan. The weather stays pleasant, perfect for sightseeing, desert camping, and outdoor activities. Avoid the summer months (April–June) when temperatures soar above 45°C. The monsoon season (July–September) brings greenery but some areas may be harder to access.',
                icon: Calendar,
                tips: ['Peak season: November to February', 'Festival time: Pushkar Fair (Nov), Jaipur Lit Fest (Jan)', 'Budget tip: Early October & March offer lower rates'],
              },
              {
                step: '02',
                title: 'Select Your Destinations & Route',
                desc: 'Rajasthan is vast — plan a focused route rather than trying to cover everything. The classic Golden Triangle (Delhi → Jaipur → Agra) is great for first-timers. For deeper exploration, add Udaipur, Jodhpur, and Jaisalmer. Wildlife lovers should include Ranthambore. Spiritual seekers can add Pushkar and Ajmer.',
                icon: MapPin,
                tips: ['3–4 days: Jaipur + Udaipur', '5–7 days: Jaipur → Jodhpur → Jaisalmer → Udaipur', '8–10 days: Full Rajasthan circuit with wildlife safari'],
              },
              {
                step: '03',
                title: 'Decide Your Travel Style & Budget',
                desc: 'Rajasthan caters to every budget — from backpacker hostels to luxury palace hotels. Decide early whether you prefer a guided group tour, a private customized trip, or a self-drive adventure. Private tours offer the most flexibility while group tours are budget-friendly and social.',
                icon: Wallet,
                tips: ['Budget: ₹2,000–4,000/person/day', 'Mid-range: ₹5,000–10,000/person/day', 'Luxury: ₹15,000+/person/day (palace hotels, private cars)'],
              },
              {
                step: '04',
                title: 'Book Accommodation in Advance',
                desc: 'Heritage havelis, lake-view palaces, and desert camps fill up fast during peak season. Book at least 4–6 weeks ahead for popular properties. In Jaipur, stay near Amer for fort access or MI Road for city convenience. In Udaipur, lakeside hotels offer magical views. In Jaisalmer, a night in a desert camp is a must.',
                icon: Mountain,
                tips: ['Book heritage stays 6–8 weeks ahead for Nov–Feb', 'Try a mix: city hotel + heritage haveli + desert camp', 'Check cancellation policies for flexibility'],
              },
              {
                step: '05',
                title: 'Arrange Local Transport & Guides',
                desc: 'Hiring a private car with a driver is the most comfortable way to explore Rajasthan. Distances between cities are long (200–400 km), so plan travel days wisely. A knowledgeable local guide at each fort and palace makes a huge difference — they bring centuries of history alive with stories and hidden details.',
                icon: Compass,
                tips: ['Private car + driver: ₹2,500–4,000/day for an SUV', 'Train: Rajasthan has good rail connectivity between cities', 'Guides: ₹500–1,500 per monument — always worth it'],
              },
              {
                step: '06',
                title: 'Book Your Tour or Customize Your Package',
                desc: 'Once you have your dates, route, and budget, it\'s time to finalize. You can book a ready-made package or work with a trusted tour operator to customize every detail. Look for operators approved by the Rajasthan Tourism Department with genuine reviews and transparent pricing.',
                icon: CheckCircle,
                tips: ['Compare at least 2–3 operators before booking', 'Check Google reviews and ask for references', 'Ensure prices include taxes, entry fees, and transfers'],
              },
            ].map((item, idx) => (
              <li key={item.step} className="relative flex gap-5 sm:gap-8 group">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-amber-200 shrink-0 z-10 group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  {idx < 5 && <div className="w-0.5 flex-1 bg-amber-200 my-1" />}
                </div>

                {/* Content Card */}
                <div className="flex-1 pb-10">
                  <Card className="p-5 sm:p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                        <item.icon className="w-4.5 h-4.5 text-amber-600" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-stone-900">{item.title}</h3>
                    </div>
                    <p className="text-stone-600 leading-relaxed mb-4">{item.desc}</p>
                    {/* Quick Tips */}
                    <div className="bg-amber-50/60 rounded-xl p-4">
                      <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">Quick Tips</p>
                      <ul className="space-y-1.5">
                        {item.tips.map((tip, ti) => (
                          <li key={ti} className="flex items-start gap-2 text-sm text-stone-600">
                            <CircleDot className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </div>
              </li>
            ))}
          </ol>

          {/* CTA at bottom */}
          <div className="mt-4 text-center">
            <p className="text-stone-500 mb-4">Need help planning? Our Rajasthan travel experts will create a custom itinerary just for you — free of cost.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact"><Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-5 rounded-full text-base shadow-lg"><Send className="w-4 h-4 mr-2" />Get Free Itinerary</Button></Link>
              <a href={phoneHref} rel="noopener noreferrer"><Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 px-8 py-5 rounded-full text-base"><Phone className="w-4 h-4 mr-2" />Talk to Expert</Button></a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BRAND FACTS ===== */}
      <section className="section-padding bg-stone-50" data-testid="brand-facts-section" aria-labelledby="brand-facts-heading">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 sm:p-10 border-0 shadow-lg bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-3xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-10 bg-amber-500 rounded-full" />
              <h3 id="brand-facts-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">Trusted Rajasthan Tour Experience</h3>
            </div>
            <p className="text-stone-500 mb-10 ml-5 max-w-2xl">Thousands of travellers trust us every year for well-planned, authentic Rajasthan tour packages focused on heritage, adventure, and unforgettable memories.</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Users, value: '50K+', label: 'Happy Travellers', color: 'amber' },
                { icon: Calendar, value: '15+', label: 'Years of Service', color: 'amber' },
                { icon: Star, value: '4.9/5', label: 'Customer Satisfaction', color: 'amber' },
                { icon: MapPinned, value: '200+', label: 'Tour Packages Conducted', color: 'amber' },
              ].map((fact) => (
                <div key={fact.label} className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                    <fact.icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="border-l border-stone-200 pl-3">
                    <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 leading-tight">{fact.value}</p>
                    <p className="text-sm text-stone-500 mt-0.5">{fact.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* ===== CONTACT / ENQUIRY ===== */}
      <section className="section-padding bg-stone-50" data-testid="contact-section" aria-labelledby="contact-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">Get in Touch</Badge>
            <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold text-stone-900">Ready to Explore Rajasthan?</h2>
            <p className="text-stone-500 mt-2">Fill out the form below and our travel experts will get back to you within 24 hours</p>
          </div>
          <EnquiryForm />
        </div>
      </section>
      </main>
    </div>
  );
}
