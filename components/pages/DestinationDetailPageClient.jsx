'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  MapPin, Calendar, Plane, Train, Car, Star, ArrowRight,
  Lightbulb, HelpCircle, ChevronRight, Compass, Camera,
  Clock, Sun, Heart, Shield, IndianRupee, Users, Phone,
  MessageCircle, CheckCircle, Award, Sparkles,
  CloudRain, Snowflake, Landmark, ShoppingBag, Utensils,
  Music, Tent,
} from 'lucide-react';
import DynamicHeaderClient from '@/components/shared/DynamicHeaderClient';
import EnquiryDialog from '@/components/shared/EnquiryDialog';
import PackageCard from '@/components/shared/PackageCard';
import { IMG_DESTINATIONS_HERO, IMG_DESTINATION_DEFAULT } from '@/lib/image-config';

/* ─────────────────────────────────────────────────── */
/*  Destination Detail Page – Full Conversion Layout   */
/* ─────────────────────────────────────────────────── */

export default function DestinationDetailPageClient({
  dest,
  relatedPackages = [],
  otherDestinations = [],
  reviews = [],
  navTours,
  navBlogs,
  navDestinations,
  siteSettings,
}) {
  const [activeTab, setActiveTab] = useState('air');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryPkg, setEnquiryPkg] = useState(null);
  const [descExpanded, setDescExpanded] = useState(false);

  const howToReach = dest.how_to_reach || {};
  const keyAttractions = dest.key_attractions || [];
  const travelTips = dest.travel_tips || [];
  const faqs = (dest.faqs || []).filter((f) => f?.question && f?.answer);

  /* ── phone / whatsapp ── */
  const phoneRaw = siteSettings?.business_phone || '+91 98765 43210';
  const whatsappNumber = phoneRaw.replace(/\D/g, '');
  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in visiting ${dest.name}. Please share tour details and best offers.`,
  );

  /* ── transport tabs ── */
  const transportTabs = [
    { key: 'air', label: 'By Air', icon: Plane, content: howToReach.air },
    { key: 'rail', label: 'By Rail', icon: Train, content: howToReach.rail },
    { key: 'road', label: 'By Road', icon: Car, content: howToReach.road },
  ].filter((t) => t.content);

  /* ── generate sample itinerary from key attractions ── */
  const itinerary = (() => {
    if (keyAttractions.length === 0) return [];
    const days = [];
    const perDay = Math.max(2, Math.ceil(keyAttractions.length / 3));
    for (let i = 0; i < keyAttractions.length; i += perDay) {
      const dayAttractions = keyAttractions.slice(i, i + perDay);
      const dayNum = days.length + 1;
      const totalDays = Math.ceil(keyAttractions.length / perDay);
      const title =
        dayNum === 1
          ? 'Arrival & City Exploration'
          : dayNum === totalDays
            ? 'Explore & Departure'
            : `Sightseeing Day ${dayNum}`;
      days.push({ day: dayNum, title, activities: dayAttractions });
    }
    return days;
  })();

  /* ── experiences ── */
  const experiences = [
    { icon: Landmark, title: 'Heritage Tours', desc: `Explore ${dest.name}'s ancient forts, palaces, and monuments with expert guides` },
    { icon: Utensils, title: 'Local Cuisine', desc: 'Savor authentic Rajasthani delicacies — Dal Baati Churma, Ghevar, and more' },
    { icon: ShoppingBag, title: 'Shopping', desc: 'Traditional handicrafts, textiles, gemstones, and handmade souvenirs' },
    { icon: Camera, title: 'Photography', desc: 'Capture stunning architecture, vibrant markets, and golden hour landscapes' },
    { icon: Music, title: 'Cultural Shows', desc: 'Experience folk music, puppet shows, and traditional Rajasthani dance' },
    { icon: Tent, title: 'Adventure', desc: 'Desert safaris, camel rides, hot air balloons, and nature treks' },
  ];

  /* ── why choose us ── */
  const whyChooseUs = [
    { icon: Award, title: 'Local Expert Guides', desc: 'Deep knowledge of every hidden gem and royal story' },
    { icon: Shield, title: 'Safe & Reliable', desc: 'Verified hotels, insured travel, trusted drivers' },
    { icon: IndianRupee, title: 'Best Price Guarantee', desc: 'Transparent pricing — no hidden charges ever' },
    { icon: Users, title: '24/7 Support', desc: 'Dedicated assistance throughout your entire journey' },
    { icon: Heart, title: '100% Customizable', desc: 'Tailor-made itineraries crafted to your preferences' },
    { icon: Star, title: '1000+ Happy Travelers', desc: 'Consistently top-rated by travelers worldwide' },
  ];

  /* ── seasons (static class names for Tailwind) ── */
  const seasons = [
    {
      name: 'Winter', months: 'Oct – Feb', icon: Snowflake,
      iconClass: 'text-blue-500',
      badge: 'Best Time', badgeClass: 'bg-emerald-100 text-emerald-700',
      temp: '8°C – 25°C', isBest: true,
      desc: 'Pleasant weather, perfect for sightseeing and outdoor exploration. Peak tourist season with festive vibes.',
    },
    {
      name: 'Summer', months: 'Mar – Jun', icon: Sun,
      iconClass: 'text-orange-500',
      badge: 'Hot', badgeClass: 'bg-orange-100 text-orange-700',
      temp: '25°C – 45°C', isBest: false,
      desc: 'Hot and dry. Fewer crowds and lower prices. Best for budget travelers who don\'t mind the heat.',
    },
    {
      name: 'Monsoon', months: 'Jul – Sep', icon: CloudRain,
      iconClass: 'text-teal-500',
      badge: 'Off Season', badgeClass: 'bg-blue-100 text-blue-700',
      temp: '24°C – 35°C', isBest: false,
      desc: 'Light to moderate rain brings lush greenery. Great photography weather with dramatic skies.',
    },
  ];

  /* ─────────────────── JSX ─────────────────── */
  return (
    <>
      <DynamicHeaderClient
        tours={navTours}
        blogs={navBlogs}
        destinations={navDestinations}
        variant="transparent"
        siteSettings={siteSettings}
      />

      {/* ───────── HERO ───────── */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
        {(dest.image_url || IMG_DESTINATION_DEFAULT) && (
          <Image
            src={dest.image_url || IMG_DESTINATION_DEFAULT}
            alt={dest.name}
            fill
            priority
            unoptimized
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/40 to-stone-900/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 pb-12 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-stone-300 mb-4">
              <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/destinations" className="hover:text-amber-400 transition-colors">Destinations</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-amber-400">{dest.name}</span>
            </nav>

            <Badge className="bg-amber-500/80 text-white border-0 backdrop-blur-sm text-sm px-4 py-1 mb-3">
              {dest.tagline}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight">
              {dest.name}
            </h1>
            {dest.best_time_to_visit && (
              <div className="flex items-center gap-2 text-amber-200/90 text-sm sm:text-base">
                <Calendar className="w-4 h-4" />
                <span>Best Time: <strong>{dest.best_time_to_visit}</strong></span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───────── QUICK STATS ───────── */}
      <section className="relative -mt-8 z-10 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: MapPin, label: 'Attractions', value: `${keyAttractions.length}+ Places` },
              { icon: Calendar, label: 'Best Time', value: dest.best_time_to_visit || 'Year Round' },
              { icon: Compass, label: 'Region', value: 'Rajasthan, India' },
              { icon: Star, label: 'Type', value: dest.tagline || 'Heritage City' },
            ].map((stat, i) => (
              <Card key={i} className="bg-white shadow-lg border-0">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <stat.icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">{stat.label}</p>
                    <p className="text-sm font-semibold text-stone-800">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── OVERVIEW + ENQUIRY CTA ───────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left — About */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Compass className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                    About {dest.name}
                  </h2>
                  <p className="text-stone-500 text-sm">Everything you need to know</p>
                </div>
              </div>
              {/* Rich HTML description with expandable Read More */}
              {(() => {
                const isHTML = dest.description && /<[a-z][\s\S]*>/i.test(dest.description);
                const isLong = (dest.description || '').length > 600;
                if (isHTML) {
                  return (
                    <>
                      <div
                        className={`prose prose-lg prose-stone max-w-none
                          prose-headings:text-stone-900 prose-headings:font-bold
                          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                          prose-p:leading-relaxed prose-p:text-stone-700
                          prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline
                          prose-img:rounded-xl prose-img:shadow-md
                          prose-blockquote:border-amber-400 prose-blockquote:bg-amber-50/50
                          prose-strong:text-stone-800
                          prose-li:text-stone-600
                          ${!descExpanded && isLong ? 'max-h-[300px] overflow-hidden relative' : ''}`}
                        dangerouslySetInnerHTML={{ __html: dest.description }}
                      />
                      {!descExpanded && isLong && (
                        <div className="relative -mt-16 pt-16 bg-gradient-to-t from-white to-transparent" />
                      )}
                      {isLong && (
                        <button
                          onClick={() => setDescExpanded(!descExpanded)}
                          className="mt-3 text-amber-600 hover:text-amber-700 font-semibold text-sm flex items-center gap-1 transition-colors"
                        >
                          {descExpanded ? 'Show Less ▲' : 'Read More ▼'}
                        </button>
                      )}
                    </>
                  );
                }
                // Plain text fallback with expandable
                return (
                  <>
                    <p className={`text-stone-700 text-lg leading-relaxed whitespace-pre-line ${!descExpanded && isLong ? 'line-clamp-6' : ''}`}>
                      {dest.description}
                    </p>
                    {isLong && (
                      <button
                        onClick={() => setDescExpanded(!descExpanded)}
                        className="mt-3 text-amber-600 hover:text-amber-700 font-semibold text-sm flex items-center gap-1 transition-colors"
                      >
                        {descExpanded ? 'Show Less ▲' : 'Read More ▼'}
                      </button>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Right — Enquiry CTA Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-500" />
                  <CardContent className="p-6">
                    <div className="text-center mb-5">
                      <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs mb-3">
                        <Sparkles className="w-3 h-3 mr-1" /> Limited Time Offer
                      </Badge>
                      <h3 className="text-xl font-bold text-stone-900">
                        Plan Your {dest.name} Trip
                      </h3>
                      <p className="text-stone-500 text-sm mt-1">
                        Get customized itinerary &amp; best deals
                      </p>
                    </div>

                    <div className="space-y-3 mb-5">
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <div>
                          <p className="text-sm font-semibold">WhatsApp Us</p>
                          <p className="text-xs text-emerald-100">Quick response, instant quotes</p>
                        </div>
                      </a>

                      <a
                        href={`tel:${phoneRaw}`}
                        className="flex items-center gap-3 w-full p-3 rounded-xl bg-white border border-stone-200 hover:border-amber-300 hover:bg-amber-50 text-stone-800 transition-colors"
                      >
                        <Phone className="w-5 h-5 text-amber-600" />
                        <div>
                          <p className="text-sm font-semibold">Call Now</p>
                          <p className="text-xs text-stone-500">{phoneRaw}</p>
                        </div>
                      </a>
                    </div>

                    <Button
                      onClick={() => setEnquiryOpen(true)}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-full font-semibold shadow-lg"
                      size="lg"
                    >
                      Get Free Quote
                    </Button>

                    <div className="flex items-center justify-center gap-4 mt-4 text-xs text-stone-500">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-500" /> Free Cancellation
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-500" /> Best Price
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── KEY ATTRACTIONS ───────── */}
      {keyAttractions.length > 0 && (
        <section className="py-12 sm:py-16 bg-gradient-to-b from-amber-50/50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Camera className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">Key Attractions</h2>
                <p className="text-stone-500 text-sm">Must-visit places in {dest.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyAttractions.map((attr, idx) => (
                <Card
                  key={idx}
                  className="group border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white"
                >
                  <CardContent className="p-0">
                    <div className="h-2 bg-gradient-to-r from-amber-400 to-orange-400" />
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center shrink-0 text-amber-700 font-bold text-lg">
                          {idx + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">
                            {attr.name}
                          </h3>
                          <p className="text-stone-600 text-sm leading-relaxed">
                            {attr.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── SAMPLE ITINERARY ───────── */}
      {itinerary.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                  Sample Itinerary
                </h2>
                <p className="text-stone-500 text-sm">
                  Suggested {itinerary.length}-day plan for {dest.name}
                </p>
              </div>
            </div>

            <Accordion
              type="single"
              collapsible
              defaultValue="day-1"
              className="space-y-4"
            >
              {itinerary.map((day) => (
                <AccordionItem
                  key={day.day}
                  value={`day-${day.day}`}
                  className="bg-white border border-stone-200 rounded-xl px-5 shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        D{day.day}
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">{day.title}</p>
                        <p className="text-xs text-stone-500">
                          {day.activities.length} places to explore
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="space-y-3 pl-14">
                      {day.activities.map((act, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-lg bg-stone-50"
                        >
                          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                            <MapPin className="w-3 h-3 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-stone-800 text-sm">
                              {act.name}
                            </p>
                            <p className="text-stone-500 text-xs mt-0.5">
                              {act.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-6">
              <Button
                onClick={() => setEnquiryOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8"
              >
                <Sparkles className="w-4 h-4 mr-2" /> Get Customized Itinerary
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ───────── EXPERIENCES / THINGS TO DO ───────── */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-rose-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Things to Do in {dest.name}
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Unforgettable experiences await you
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {experiences.map((exp, idx) => {
              const Icon = exp.icon;
              return (
                <Card
                  key={idx}
                  className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <CardContent className="p-5 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center mx-auto mb-4 group-hover:from-amber-100 group-hover:to-orange-100 transition-colors">
                      <Icon className="w-7 h-7 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-stone-900 mb-1">{exp.title}</h3>
                    <p className="text-stone-500 text-xs leading-relaxed">{exp.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── BEST TIME TO VISIT (Improved) ───────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <Sun className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                Best Time to Visit {dest.name}
              </h2>
              {dest.best_time_to_visit && (
                <p className="text-amber-600 font-semibold">{dest.best_time_to_visit}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {seasons.map((season, idx) => {
              const Icon = season.icon;
              return (
                <Card
                  key={idx}
                  className={`border-0 shadow-md overflow-hidden ${
                    season.isBest ? 'ring-2 ring-emerald-400 ring-offset-2' : ''
                  }`}
                >
                  <CardContent className="p-0">
                    <div
                      className={`p-5 ${
                        season.isBest
                          ? 'bg-gradient-to-br from-emerald-50 to-teal-50'
                          : 'bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-5 h-5 ${season.iconClass}`} />
                          <h3 className="font-bold text-stone-900">{season.name}</h3>
                        </div>
                        <Badge className={`${season.badgeClass} border-0 text-xs`}>
                          {season.badge}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-stone-700 mb-1">
                        {season.months}
                      </p>
                      <p className="text-xs text-stone-500 mb-2">
                        Temperature: {season.temp}
                      </p>
                      <p className="text-stone-600 text-xs leading-relaxed">
                        {season.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {dest.best_time_details && (
            <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-amber-50">
              <CardContent className="p-6">
                <p className="text-stone-700 leading-relaxed">
                  {dest.best_time_details}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* ───────── HOW TO REACH ───────── */}
      {transportTabs.length > 0 && (
        <section className="py-12 sm:py-16 bg-gradient-to-b from-stone-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Plane className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                  How to Reach {dest.name}
                </h2>
                <p className="text-stone-500 text-sm">Getting to {dest.name}</p>
              </div>
            </div>

            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <div className="flex border-b">
                  {transportTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium transition-colors ${
                          activeTab === tab.key
                            ? 'text-amber-700 border-b-2 border-amber-500 bg-amber-50/50'
                            : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
                <div className="p-6">
                  {transportTabs.map(
                    (tab) =>
                      activeTab === tab.key && (
                        <p key={tab.key} className="text-stone-700 leading-relaxed">
                          {tab.content}
                        </p>
                      ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* ───────── TRAVEL TIPS ───────── */}
      {travelTips.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                  Travel Tips
                </h2>
                <p className="text-stone-500 text-sm">
                  Insider tips for visiting {dest.name}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
              {travelTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-emerald-600 font-bold text-sm">{idx + 1}</span>
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── WHY CHOOSE US ───────── */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Why Travel With Us
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Trusted by thousands of happy travelers
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="text-center p-5 rounded-2xl bg-white shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-amber-700" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── RELATED TOUR PACKAGES (shared PackageCard) ───────── */}
      {relatedPackages.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                    {dest.name} Tour Packages
                  </h2>
                  <p className="text-stone-500 text-sm">
                    Curated tours featuring {dest.name}
                  </p>
                </div>
              </div>
              <Link
                href="/tour-packages"
                className="hidden sm:flex items-center gap-1 text-amber-600 hover:text-amber-700 font-semibold text-sm"
              >
                All Packages <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} onEnquire={(p) => { setEnquiryPkg(p); setEnquiryOpen(true); }} />
              ))}
            </div>

            <div className="text-center mt-6 sm:hidden">
              <Link href="/tour-packages">
                <Button variant="outline" className="rounded-full">
                  View All Packages <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ───────── TESTIMONIALS / REVIEWS ───────── */}
      {reviews.length > 0 && (
        <section className="py-12 sm:py-16 bg-gradient-to-b from-stone-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-yellow-600 fill-yellow-500" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                What Travelers Say
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Real reviews from our happy guests
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, idx) => (
                <Card
                  key={review.id || idx}
                  className="border-0 shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-stone-200'
                          }`}
                        />
                      ))}
                    </div>
                    {/* Comment */}
                    <p className="text-stone-600 text-sm leading-relaxed mb-4 italic">
                      &ldquo;{review.comment || review.review_text}&rdquo;
                    </p>
                    {/* Reviewer */}
                    <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold text-sm">
                        {(review.name || review.reviewer_name || 'T')
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-800 text-sm">
                          {review.name || review.reviewer_name}
                        </p>
                        <p className="text-xs text-stone-400">
                          {new Date(review.created_at).toLocaleDateString('en-IN', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── FAQs ───────── */}
      {faqs.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-10 justify-center text-center">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-3">
                  <HelpCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                  Frequently Asked Questions
                </h2>
                <p className="text-stone-500 text-sm mt-1">
                  About visiting {dest.name}
                </p>
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="bg-white border border-stone-200 rounded-xl px-5 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-stone-800 hover:text-amber-700 py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-600 leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* ───────── OTHER DESTINATIONS ───────── */}
      {otherDestinations.length > 0 && (
        <section className="py-12 sm:py-16 bg-gradient-to-b from-stone-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                Explore More Destinations
              </h2>
              <p className="text-stone-500">Continue your Rajasthan discovery</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {otherDestinations.map((d) => (
                <Link
                  key={d.id}
                  href={`/destinations/${d.slug}`}
                  className="group"
                >
                  <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-md">
                    {(d.image_url || IMG_DESTINATION_DEFAULT) && (
                      <Image
                        src={d.image_url || IMG_DESTINATION_DEFAULT}
                        alt={d.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-amber-300 text-xs font-medium">
                        {d.tagline}
                      </p>
                      <h3 className="text-white font-bold text-lg">{d.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── CTA BANNER ───────── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 relative overflow-hidden">
        {IMG_DESTINATIONS_HERO && (
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Image src={IMG_DESTINATIONS_HERO} alt="" fill sizes="100vw" unoptimized className="object-cover" aria-hidden="true" />
          </div>
        )}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Plan Your {dest.name} Trip Today
          </h2>
          <p className="text-stone-300 text-lg mb-8 max-w-2xl mx-auto">
            Let our local experts craft a personalized {dest.name} itinerary just
            for you. Best hotels, guided tours, and hassle-free travel — all at
            the best price.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tour-packages">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-8 font-semibold shadow-lg"
              >
                Browse Tour Packages
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setEnquiryOpen(true)}
              className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-8 font-semibold backdrop-blur-sm"
            >
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>

      {/* ───────── ENQUIRY DIALOG ───────── */}
      <EnquiryDialog
        open={enquiryOpen}
        onOpenChange={(open) => { setEnquiryOpen(open); if (!open) setEnquiryPkg(null); }}
        packageId={enquiryPkg?.id || null}
        packageTitle={enquiryPkg?.title || null}
        title={enquiryPkg ? `Enquire: ${enquiryPkg.title}` : `Plan Your ${dest.name} Trip`}
        description={enquiryPkg ? `Get the best deal on ${enquiryPkg.title}.` : `Tell us your preferences and our ${dest.name} experts will craft the perfect itinerary for you.`}
      />


    </>
  );
}
