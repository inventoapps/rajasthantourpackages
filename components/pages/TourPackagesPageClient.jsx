'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Shield, Award, Clock, Users, Phone, ArrowRight, MapPin, CheckCircle, Compass, IndianRupee, Headphones, CalendarDays } from 'lucide-react';
import PackageCard from '@/components/shared/PackageCard';
import EnquiryDialog from '@/components/shared/EnquiryDialog';
import PageHeader from '@/components/shared/PageHeader';
import TestimonialsSection from '@/components/shared/TestimonialsSection';
import FAQSection from '@/components/shared/FAQSection';
import BrandTrustBar from '@/components/shared/BrandTrustBar';
import SeoContentSection from '@/components/shared/SeoContentSection';
import EnquiryFormSection from '@/components/shared/EnquiryFormSection';
import CTABannerSection from '@/components/shared/CTABannerSection';

const CATEGORIES = [
  { value: 'all', label: 'All Tours' }, { value: 'heritage', label: 'Heritage' }, { value: 'luxury', label: 'Luxury' },
  { value: 'adventure', label: 'Adventure' }, { value: 'wildlife', label: 'Wildlife' }, { value: 'spiritual', label: 'Spiritual' }, { value: 'premium', label: 'Premium' },
];

const DURATIONS = [
  { value: 'all', label: 'Any Duration' },
  { value: '1', label: '1 Day' },
  { value: '2', label: '2 Days' },
  { value: '3', label: '3 Days' },
  { value: '4', label: '4 Days' },
  { value: '5', label: '5 Days' },
  { value: '6', label: '6 Days' },
  { value: '7', label: '7 Days' },
  { value: '8', label: '8 Days' },
  { value: '9', label: '9 Days' },
  { value: '10', label: '10 Days' },
];

/* ── static SEO data ── */
const TOUR_FAQS = [
  { question: 'What types of Rajasthan tour packages do you offer?', answer: 'We offer a wide range of tour packages including Heritage & Culture tours, Luxury Palace tours, Desert Safari adventures, Wildlife & Tiger Safari, Spiritual & Pilgrimage tours, Honeymoon & Romantic getaways, Family holidays, and customized private tours. Each package is crafted to provide authentic Rajasthan experiences.' },
  { question: 'How much does a Rajasthan tour package cost?', answer: 'Rajasthan tour packages start from ₹8,000 per person for budget 3-day trips. Mid-range packages (5–7 days) cost ₹15,000–35,000 per person. Luxury palace-stay packages range from ₹50,000–1,50,000+ per person. All our packages include accommodation, transport, sightseeing, and breakfast. We offer the best value for every budget.' },
  { question: 'Can I customize my Rajasthan tour package?', answer: 'Absolutely! All our packages are fully customizable. You can modify the itinerary, change hotels, add or remove destinations, extend your trip, or include special experiences like desert camping, cooking classes, or private palace dinners. Just tell us your preferences and we\'ll create a tailor-made itinerary.' },
  { question: 'What is included in your tour packages?', answer: 'Our standard packages include comfortable accommodation (3-star to 5-star as per category), private AC vehicle with experienced driver, daily breakfast, all sightseeing as per itinerary, monument entry fees, airport/railway station transfers, and 24/7 travel support. Meals, flights, and personal expenses are typically excluded unless specified.' },
  { question: 'How do I book a Rajasthan tour package?', answer: 'Booking is simple! Browse our packages, fill out the enquiry form with your travel dates and preferences, and our travel expert will call you within 2 hours with a detailed itinerary and quote. You can also call us directly. We require a 25% advance to confirm your booking, with the balance due 7 days before departure.' },
  { question: 'What is your cancellation and refund policy?', answer: 'We offer flexible cancellation. Cancellations 30+ days before departure get a full refund minus processing fees. 15–30 days: 75% refund. 7–15 days: 50% refund. Less than 7 days: no refund. We recommend travel insurance for complete peace of mind. Date changes are free up to 15 days before departure.' },
  { question: 'Are your tour packages suitable for families with children?', answer: 'Yes! Many of our packages are designed with families in mind. We include child-friendly hotels, shorter driving distances, engaging activities like camel rides and folk shows, and flexible scheduling. Children under 5 travel free, and ages 5–12 get special discounted rates.' },
  { question: 'Do you offer group discounts for Rajasthan tours?', answer: 'Yes, we offer attractive group discounts. Groups of 6–10 get 10% off, groups of 11–20 get 15% off, and larger groups get custom pricing. We also offer special rates for corporate retreats, school trips, and wedding groups. Contact us for a group quote.' },
];

const WHY_BOOK = [
  { icon: Shield, title: 'Best Price Guarantee', desc: 'We match or beat any comparable quote. Get the best value for your Rajasthan holiday.' },
  { icon: Award, title: 'Handcrafted Itineraries', desc: 'Each tour is designed by Rajasthan travel experts with 15+ years of local experience.' },
  { icon: Headphones, title: '24/7 Travel Support', desc: 'Dedicated travel manager available round-the-clock during your trip for any assistance.' },
  { icon: CheckCircle, title: 'Verified Hotels & Drivers', desc: 'All hotels personally inspected. All drivers experienced, licensed, and background-verified.' },
  { icon: IndianRupee, title: 'No Hidden Costs', desc: 'Transparent pricing with everything included. What you see is what you pay — no surprises.' },
  { icon: CalendarDays, title: 'Flexible Booking', desc: 'Free date changes, easy cancellation, and pay-in-installments options for stress-free planning.' },
];

const POPULAR_ROUTES = [
  { name: 'Golden Triangle', cities: 'Delhi → Agra → Jaipur', days: '4–5 Days', best: 'First-timers' },
  { name: 'Royal Rajasthan', cities: 'Jaipur → Jodhpur → Jaisalmer → Udaipur', days: '8–10 Days', best: 'Complete experience' },
  { name: 'Desert Circuit', cities: 'Jodhpur → Jaisalmer → Bikaner', days: '5–6 Days', best: 'Desert lovers' },
  { name: 'Heritage & Lakes', cities: 'Jaipur → Pushkar → Udaipur → Mt Abu', days: '7–8 Days', best: 'Couples' },
  { name: 'Wildlife Trail', cities: 'Jaipur → Ranthambore → Bharatpur', days: '4–5 Days', best: 'Nature enthusiasts' },
  { name: 'Spiritual Journey', cities: 'Pushkar → Ajmer → Nathdwara → Eklingji', days: '4–5 Days', best: 'Pilgrims' },
];

const CONTENT_SECTIONS = [
  { title: 'Rajasthan Tour Packages — Your Gateway to Royal India', content: 'Rajasthan is India\'s most sought-after tourist destination, attracting millions of travelers each year with its magnificent forts, opulent palaces, vibrant culture, and warm hospitality. Our carefully curated Rajasthan tour packages bring you the very best of this incredible state — from the iconic Amber Fort in Jaipur to the romantic lakes of Udaipur, from the golden dunes of Jaisalmer to the blue-washed streets of Jodhpur.' },
  { title: 'Packages for Every Type of Traveler', content: 'Whether you\'re a history enthusiast seeking ancient forts and legends, a couple looking for a romantic palace getaway, a family wanting fun-filled cultural experiences, or an adventurer craving desert safaris and wildlife encounters — we have the perfect Rajasthan tour package for you. Our heritage tours immerse you in centuries of royal history, luxury packages pamper you in converted palaces, adventure tours take you off the beaten path, and our wildlife safaris bring you face-to-face with the majestic Bengal tiger.' },
  { title: 'Why Book a Rajasthan Tour Package With Us?', content: 'With over 15 years of experience and 50,000+ happy travelers, we are one of Rajasthan\'s most trusted tour operators. Every itinerary is personally crafted by our team of local travel experts who know Rajasthan inside-out. We handpick the best hotels, employ experienced drivers, and provide a dedicated travel manager for every booking. Our packages offer the perfect balance of curated experiences and free time — giving you the structure of a guided tour with the freedom of independent travel.' },
];

export default function TourPackagesPage({
  initialPackages = [],
  initialCategory = 'all',
  initialSearch = '',
  initialDuration = 'all',
  reviews = [],
}) {
  const [packages, setPackages] = useState(initialPackages);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [duration, setDuration] = useState(initialDuration);
  const [loading, setLoading] = useState(false);
  const [enquiryPkg, setEnquiryPkg] = useState(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const firstLoad = useRef(true);

  const openEnquiry = (pkg) => {
    setEnquiryPkg(pkg);
    setIsEnquiryOpen(true);
  };

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (search) params.set('search', search);
    if (duration !== 'all') params.set('duration', duration);
    fetch(`/api/packages?${params}`).then(r => r.json()).then(d => { setPackages(d); setLoading(false); }).catch(() => setLoading(false));
  }, [category, search, duration]);

  return (
    <div className="min-h-screen bg-stone-50" data-testid="tour-packages-page">
      <PageHeader
        title="Rajasthan Tour Packages"
        subtitle="Handcrafted tours across the Land of Kings — heritage, luxury, wildlife, desert & more"
        breadcrumbs={[{ label: 'Tour Packages' }]}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input placeholder="Search by destination or tour name..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-white/95 border-0 py-5 rounded-xl" data-testid="search-input" />
          </div>
        </div>
      </PageHeader>

      {/* ══════ FILTERS + PACKAGES GRID ══════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map(c => (
            <button key={c.value} onClick={() => setCategory(c.value)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === c.value ? 'bg-amber-600 text-white shadow-md' : 'bg-white text-stone-600 hover:bg-amber-50 border border-stone-200'}`} data-testid={`category-${c.value}`}>{c.label}</button>
          ))}
        </div>

        {/* Duration filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="flex items-center text-xs font-semibold text-stone-500 uppercase tracking-wider mr-1"><Clock className="w-3.5 h-3.5 mr-1" />Duration:</span>
          {DURATIONS.map(d => (
            <button key={d.value} onClick={() => setDuration(d.value)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${duration === d.value ? 'bg-stone-800 text-white shadow-md' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}`} data-testid={`duration-${d.value}`}>{d.label}</button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" /></div>
        ) : packages.length === 0 ? (
          <div className="text-center py-20"><p className="text-xl text-stone-500 mb-4">No packages found</p><Button onClick={() => { setCategory('all'); setSearch(''); setDuration('all'); }}>Clear Filters</Button></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} onEnquire={openEnquiry} />
            ))}
          </div>
        )}
      </div>

      {/* ══════ WHY BOOK WITH US ══════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">Why Choose Us</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">Why Book Your Rajasthan Tour With Us?</h2>
            <p className="text-stone-500 mt-3 max-w-2xl mx-auto">Trusted by 50,000+ travelers. Here&#39;s what sets us apart.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_BOOK.map((item) => (
              <Card key={item.title} className="p-6 border-0 shadow-md hover:shadow-xl transition-shadow group">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                  <item.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ POPULAR ROUTES ══════ */}
      <section className="py-16 sm:py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">Popular Routes</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">Most Popular Rajasthan Tour Routes</h2>
            <p className="text-stone-500 mt-3 max-w-2xl mx-auto">Choose from our most-loved itineraries covering the best of Rajasthan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {POPULAR_ROUTES.map((route) => (
              <div key={route.name} className="bg-white rounded-xl p-5 shadow-md border border-stone-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Compass className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-stone-900">{route.name}</h3>
                </div>
                <p className="text-stone-600 text-sm mb-3">{route.cities}</p>
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" />{route.days}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-amber-500" />{route.best}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SEO CONTENT ══════ */}
      <SeoContentSection
        heading="The Ultimate Guide to Rajasthan Tour Packages"
        sections={CONTENT_SECTIONS}
        bgCard="bg-stone-50"
        bgSection="bg-white"
        expandedContent={
          <>
            <h3>How to Choose the Right Rajasthan Tour Package</h3>
            <p>
              <strong>Duration:</strong> Short on time? Our 3–4 day packages cover one region well. Have a week? The classic Jaipur-Jodhpur-Jaisalmer-Udaipur circuit is perfect. 10+ days lets you add Pushkar, Ranthambore, and hidden gems.{' '}
              <strong>Budget:</strong> We offer packages across all budgets — from backpacker-friendly stays in heritage guesthouses to ultra-luxury palace experiences.{' '}
              <strong>Interests:</strong> History buffs love our heritage tours. Couples prefer our romantic palace packages. Families enjoy our activity-filled cultural tours. Wildlife lovers choose our Ranthambore safari specials.
            </p>
            <h3>Best Time to Book Rajasthan Tour Packages</h3>
            <p>
              Peak season (October–March) offers the best weather but higher prices. Book 2–3 months in advance for peak season to get the best hotels. Monsoon season (July–September) offers dramatic landscapes and 30–40% lower prices — perfect for budget travelers who don&#39;t mind occasional rain. Summer (April–June) is ideal for hill stations like Mount Abu and offers the best wildlife sighting rates at Ranthambore.
            </p>
          </>
        }
      />

      {/* ══════ TESTIMONIALS ══════ */}
      <TestimonialsSection
        reviews={reviews}
        title="Loved by 50,000+ Travelers"
        subtitle="See what our guests have to say about their Rajasthan experience"
      />

      {/* ══════ ENQUIRY FORM ══════ */}
      <EnquiryFormSection
        title="Plan Your Rajasthan Tour Today"
        subtitle="Share your travel preferences and get a customized itinerary with the best price — free of charge!"
        packageTitle="Rajasthan Tour Package Enquiry"
      />

      {/* ══════ FAQs ══════ */}
      <FAQSection
        faqs={TOUR_FAQS}
        title="Tour Package FAQs"
        subtitle="Common questions about booking Rajasthan tour packages"
      />

      {/* ══════ BRAND TRUST BAR ══════ */}
      <BrandTrustBar />

      {/* ══════ FINAL CTA ══════ */}
      <CTABannerSection
        title="Can't Find the Right Package?"
        subtitle="Tell us what you're looking for and we'll create a fully customized Rajasthan tour just for you — at the best price guaranteed."
        primaryLink="/contact"
        primaryLabel="Get Custom Quote"
        secondaryLink="/destinations"
        secondaryLabel="Explore Destinations"
      />

      <EnquiryDialog
        open={isEnquiryOpen}
        onOpenChange={setIsEnquiryOpen}
        packageId={enquiryPkg?.id}
        packageTitle={enquiryPkg?.title}
      />
    </div>
  );
}
