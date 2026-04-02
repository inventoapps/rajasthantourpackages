'use client';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Calendar, Compass, Star, Shield, Phone, Mountain, Sun, Camera, Heart, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DynamicHeaderClient from '@/components/shared/DynamicHeaderClient';
import TestimonialsSection from '@/components/shared/TestimonialsSection';
import FAQSection from '@/components/shared/FAQSection';
import BrandTrustBar from '@/components/shared/BrandTrustBar';
import SeoContentSection from '@/components/shared/SeoContentSection';
import EnquiryFormSection from '@/components/shared/EnquiryFormSection';
import CTABannerSection from '@/components/shared/CTABannerSection';
import { IMG_DESTINATIONS_HERO, IMG_DESTINATION_DEFAULT } from '@/lib/image-config';

/* ── static SEO data ── */
const DESTINATIONS_FAQS = [
  { question: 'What are the most popular destinations in Rajasthan?', answer: 'The most popular destinations in Rajasthan include Jaipur (Pink City), Udaipur (City of Lakes), Jaisalmer (Golden City), Jodhpur (Blue City), Pushkar (Sacred City), and Ranthambore (Tiger Territory). Each offers a unique blend of history, culture, and adventure.' },
  { question: 'Which Rajasthan destination is best for first-time visitors?', answer: 'Jaipur is the ideal starting point for first-time visitors. As the capital city, it offers excellent infrastructure, iconic landmarks like Amber Fort and Hawa Mahal, vibrant bazaars, and easy connectivity to other Rajasthan destinations.' },
  { question: 'What is the best time to visit Rajasthan?', answer: 'October to March is the best time to visit Rajasthan. The weather is pleasant (15–25°C), perfect for sightseeing and outdoor activities. November to February is peak season. Avoid April–June when temperatures can exceed 45°C.' },
  { question: 'How many days are enough for a Rajasthan trip?', answer: 'A minimum of 5–7 days is recommended to cover 3–4 major destinations. For a comprehensive tour covering Jaipur, Jodhpur, Jaisalmer, and Udaipur, plan for 8–10 days. Weekend trips of 2–3 days work well for Jaipur or Udaipur alone.' },
  { question: 'Is Rajasthan safe for solo travelers and women?', answer: 'Yes, Rajasthan is generally safe for solo travelers and women. Tourist areas are well-policed. We recommend standard travel precautions, booking guided tours for remote areas, and choosing reputed accommodations. Many solo women travelers have wonderful experiences here.' },
  { question: 'What is the best way to travel between destinations in Rajasthan?', answer: 'Hiring a private car with driver is the most comfortable option (₹2,500–4,000/day). Rajasthan also has excellent rail connectivity between cities. State buses and luxury Volvo coaches are budget-friendly alternatives. Internal flights connect Jaipur, Udaipur, and Jodhpur.' },
  { question: 'Which destination in Rajasthan is best for couples?', answer: "Udaipur is considered the most romantic destination in Rajasthan, with its beautiful lakes, palace hotels, and sunset boat rides. Jaisalmer's desert camping under the stars is also incredibly romantic. Mount Abu offers a cooler hill station retreat." },
  { question: 'Can I see tigers in Rajasthan?', answer: 'Yes! Ranthambore National Park is one of the best places in India to spot Bengal tigers in the wild. Safari seasons run from October to June, with the best sighting chances during April–June when animals come to water sources.' },
];

const WHY_VISIT = [
  { icon: Mountain, title: 'Majestic Forts & Palaces', desc: "Home to some of India's most spectacular forts and palaces, including 6 UNESCO World Heritage hill forts." },
  { icon: Sun, title: 'Golden Desert Experiences', desc: 'Camp under a billion stars in the Thar Desert, ride camels across golden dunes, and enjoy folk performances by firelight.' },
  { icon: Camera, title: 'Rich Cultural Heritage', desc: "Vibrant festivals, colorful markets, traditional crafts, and centuries-old art forms make every corner a photographer's paradise." },
  { icon: Heart, title: 'Royal Hospitality', desc: 'Stay in converted palaces and heritage havelis. Experience the legendary Rajasthani hospitality that has welcomed travelers for centuries.' },
  { icon: Globe, title: 'Diverse Landscapes', desc: 'From the Thar Desert to the Aravalli hills, serene lakes to dense forests — Rajasthan offers incredible geographic diversity.' },
  { icon: Sparkles, title: 'Incredible Cuisine', desc: 'Savor Dal Baati Churma, Laal Maas, Ghewar, and more. Rajasthani cuisine is a flavorful journey through royal kitchens and street food stalls.' },
];

const TRAVEL_TIPS = [
  'Carry sunscreen (SPF 50+) and stay hydrated — Rajasthan can be hot even in winter afternoons.',
  'Dress modestly when visiting temples and religious sites. Cover shoulders and knees.',
  "Bargain at local markets — it's expected and part of the fun. Start at 40% of the asking price.",
  'Book desert safaris and tiger safaris in advance, especially during peak season (Nov–Feb).',
  'Carry cash for smaller towns and markets. UPI payments are widely accepted in cities.',
  'Hire local guides at forts and palaces — they bring centuries of history alive with fascinating stories.',
  'Try local food — Rajasthani thalis are a must-try for an authentic culinary experience.',
  'Respect local customs and always ask before photographing people, especially in rural areas.',
];

const CONTENT_SECTIONS = [
  { title: "Why Rajasthan is India's Most Popular Tourist Destination", content: 'Rajasthan, the largest state in India by area, is a land of timeless beauty and royal grandeur. Known as the "Land of Kings," it attracts over 50 million domestic and 1.6 million international tourists annually, making it one of India\'s most visited states. From the rose-pink walls of Jaipur to the golden sandstone of Jaisalmer, from the blue-washed streets of Jodhpur to the romantic lakes of Udaipur — every city tells a story written in stone, color, and light.' },
  { title: 'Heritage & History That Spans Centuries', content: 'Rajasthan is home to six UNESCO World Heritage hill forts — Amber, Chittorgarh, Gagron, Jaisalmer, Kumbhalgarh, and Ranthambore. These magnificent structures, along with grand palaces like City Palace (Udaipur), Umaid Bhawan Palace (Jodhpur), and Hawa Mahal (Jaipur), offer a living museum of Rajput architecture, Mughal influences, and centuries of royal legacy. Walking through these monuments is like stepping back in time.' },
  { title: 'Beyond the Forts — Nature, Wildlife & Adventure', content: "Rajasthan isn't just about forts and palaces. Ranthambore and Sariska are among India's finest tiger reserves. The Thar Desert offers thrilling camel safaris and overnight camping under star-filled skies. Mount Abu provides a refreshing hill station escape. Keoladeo National Park (Bharatpur) is a UNESCO site famous for migratory birds. For adventure seekers, there's hot air ballooning in Jaipur, zip-lining at Mehrangarh, and rock climbing in the Aravallis." },
];

export default function DestinationsPageClient({ destinations = [], reviews = [], navTours, navBlogs, navDestinations, siteSettings }) {
  return (
    <>
      <DynamicHeaderClient tours={navTours} blogs={navBlogs} destinations={navDestinations} variant="solid" siteSettings={siteSettings} />

      {/* ══════ HERO ══════ */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 overflow-hidden">
        {IMG_DESTINATIONS_HERO && (
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <Image src={IMG_DESTINATIONS_HERO} alt="" fill sizes="100vw" unoptimized className="object-cover" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-transparent to-stone-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm border border-amber-500/30">
            <Compass className="w-4 h-4" /> Explore the Land of Kings
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Rajasthan <span className="text-amber-400">Destinations</span>
          </h1>
          <p className="text-lg sm:text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed mb-8">
            From ancient forts and shimmering lakes to golden deserts and sacred temples — discover the
            most iconic places in India&#39;s most colorful state. Plan your dream Rajasthan trip today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-stone-400">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-amber-400" />6+ Iconic Cities</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-amber-400" />Expert-Guided Tours</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400" />4.9★ Rated</span>
          </div>
        </div>
      </section>

      {/* ══════ DESTINATIONS GRID ══════ */}
      <section className="py-16 sm:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">Popular Destinations</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">Top Places to Visit in Rajasthan</h2>
            <p className="text-stone-500 mt-3 max-w-2xl mx-auto">Each destination offers a unique glimpse into Rajasthan&#39;s rich heritage, vibrant culture, and stunning landscapes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, idx) => (
              <Link key={dest.id || idx} href={`/destinations/${dest.slug}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-stone-100">
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    {(dest.image_url || IMG_DESTINATION_DEFAULT) && (
                      <Image
                        src={dest.image_url || IMG_DESTINATION_DEFAULT}
                        alt={`${dest.name} - ${dest.tagline || 'Rajasthan destination'}`}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block bg-amber-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                        {dest.tagline}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {typeof dest.description === 'string' ? dest.description.replace(/<[^>]+>/g, '').slice(0, 160) + '...' : ''}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-stone-500">
                        {dest.best_time_to_visit && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-amber-500" />
                            {dest.best_time_to_visit}
                          </span>
                        )}
                        {dest.key_attractions?.length > 0 && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-500" />
                            {dest.key_attractions.length} attractions
                          </span>
                        )}
                      </div>
                      <span className="text-amber-600 group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {destinations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-stone-500 text-lg">No destinations available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════ WHY VISIT RAJASTHAN ══════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">Why Rajasthan</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">Why Visit Rajasthan?</h2>
            <p className="text-stone-500 mt-3 max-w-2xl mx-auto">India&#39;s most vibrant state offers experiences you won&#39;t find anywhere else on earth.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_VISIT.map((item) => (
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

      {/* ══════ SEO CONTENT ══════ */}
      <SeoContentSection
        heading="The Complete Guide to Rajasthan Destinations"
        sections={CONTENT_SECTIONS}
        bgCard="bg-white"
        bgSection="bg-stone-50"
        expandedContent={
          <>
            <h3>Best Time to Visit Different Regions</h3>
            <p>
              <strong>Desert Region (Jaisalmer, Jodhpur, Bikaner):</strong> November to February is ideal, when daytime temperatures are comfortable (20–25°C) and nights are cool. Desert camping is magical during these months.{' '}
              <strong>Lake Region (Udaipur, Mount Abu):</strong> September to March offers the best experience, with post-monsoon lakes full and lush greenery.{' '}
              <strong>Wildlife (Ranthambore, Sariska):</strong> October to June for safaris, with April–June being the best for tiger sightings as animals frequent water sources.{' '}
              <strong>Cultural Destinations (Jaipur, Pushkar):</strong> Year-round, but October to March is most pleasant. November is special for the Pushkar Camel Fair.
            </p>
            <h3>Planning Your Multi-City Rajasthan Itinerary</h3>
            <p>
              The most efficient way to explore Rajasthan is to follow a circular route. The classic circuit starts in Jaipur, moves west to Jodhpur, then south-west to Jaisalmer, south to Udaipur, and back east to Jaipur. This covers 1,200+ km and typically takes 7–10 days. For shorter trips, focus on a cluster: the &quot;Golden Triangle&quot; (Jaipur + Delhi + Agra), the &quot;Desert Circuit&quot; (Jodhpur + Jaisalmer), or the &quot;Lake Circuit&quot; (Udaipur + Mount Abu). Each city deserves 2–3 days minimum to explore properly without rushing.
            </p>
          </>
        }
      />

      {/* ══════ TRAVEL TIPS ══════ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">Travel Tips</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">Essential Rajasthan Travel Tips</h2>
            <p className="text-stone-500 mt-3 max-w-2xl mx-auto">Make the most of your trip with these insider tips from our travel experts.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {TRAVEL_TIPS.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <TestimonialsSection
        reviews={reviews}
        title="What Our Travelers Say"
        subtitle="Real experiences from travelers who explored Rajasthan with us"
      />

      {/* ══════ ENQUIRY FORM ══════ */}
      <EnquiryFormSection
        badge="Plan Your Trip"
        title="Get a Free Rajasthan Tour Quote"
        subtitle="Tell us your preferences and our travel experts will create a personalized itinerary for you — absolutely free!"
        packageTitle="Rajasthan Destinations Enquiry"
      />

      {/* ══════ FAQs ══════ */}
      <FAQSection
        faqs={DESTINATIONS_FAQS}
        title="Frequently Asked Questions About Rajasthan"
        subtitle="Everything you need to know before planning your Rajasthan trip"
      />

      {/* ══════ BRAND TRUST BAR ══════ */}
      <BrandTrustBar />

      {/* ══════ FINAL CTA ══════ */}
      <CTABannerSection
        title="Ready to Explore Rajasthan?"
        subtitle="Let us plan your perfect Rajasthan journey. Browse our curated tour packages or get a personalized itinerary crafted just for you."
        primaryLink="/tour-packages"
        primaryLabel="View Tour Packages"
        secondaryLink="/contact"
        secondaryLabel="Contact Us"
        secondaryIcon="phone"
      />
    </>
  );
}
