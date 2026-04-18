'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapPin, Clock, Star, Users, Phone, Mail, ChevronRight, Shield, ArrowRight, IndianRupee, CheckCircle, XCircle, CalendarDays, Hotel, Map, FileText, HelpCircle, Camera, Send, Menu, X, Home, Building2, Sunrise, Quote, Sparkles, Award, MessageCircle, Heart } from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';
import DynamicHeaderClient from '@/components/shared/DynamicHeaderClient';
import PackageCard from '@/components/shared/PackageCard';
import EnquiryDialog from '@/components/shared/EnquiryDialog';

export default function PackageDetailPage({ pkg, related = [], navTours = [], navBlogs = [], navDestinations = [], siteSettings = null }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryPkg, setEnquiryPkg] = useState(null);
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);

  const phone = siteSettings?.business_phone || '+91 98765 43210';
  const phoneHref = `tel:${phone.replace(/[\s\-()]/g, '')}`;

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview','highlights','itinerary','inclusions','price-table','hotels','tour-map','seo-content','faqs'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) setActiveSection(id);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'highlights', label: 'Highlights', icon: Star },
    { id: 'itinerary', label: 'Itinerary', icon: CalendarDays },
    { id: 'inclusions', label: 'Inclusions', icon: CheckCircle },
    { id: 'price-table', label: 'Pricing', icon: IndianRupee },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'tour-map', label: 'Map', icon: Map },
    { id: 'seo-content', label: 'Details', icon: FileText },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  ];

  const discount = pkg.price && pkg.discounted_price ? Math.round((1 - pkg.discounted_price / pkg.price) * 100) : 0;

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden" data-testid="package-detail-page">
      <DynamicHeaderClient tours={navTours} blogs={navBlogs} destinations={navDestinations} variant="transparent" siteSettings={siteSettings} />

      {/* HERO */}
      <section className="relative h-[55vh] min-h-[400px]" data-testid="package-hero">
        <div className="absolute inset-0">
          <Image src={pkg.image_url} alt={pkg.title} fill priority sizes="100vw" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 pb-10">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-sm text-white/70 mb-4" data-testid="breadcrumb">
            <Link href="/" className="hover:text-white flex items-center gap-1"><Home className="w-3.5 h-3.5" />Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/tour-packages" className="hover:text-white">Tour Packages</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white break-words min-w-0">{pkg.title}</span>
          </nav>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className="bg-amber-500 text-white border-0 max-w-full break-words">{pkg.category}</Badge>
            <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm max-w-full break-words"><Clock className="w-3 h-3 mr-1 shrink-0" />{pkg.duration}</Badge>
            <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm max-w-full break-words"><MapPin className="w-3 h-3 mr-1 shrink-0" />{pkg.location}</Badge>
            <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm max-w-full break-words"><Users className="w-3 h-3 mr-1 shrink-0" />Max {pkg.max_group_size} people</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 break-words" data-testid="package-title">{pkg.title}</h1>
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex flex-wrap items-center gap-1 min-w-0">{[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.round(pkg.rating) ? 'fill-amber-400 text-amber-400' : 'text-white/30'}`} />)}<span className="text-white ml-1.5 text-sm font-medium">{pkg.rating}</span><span className="text-white/60 text-sm break-words">({pkg.reviews_count} reviews)</span></div>
          </div>
        </div>
      </section>

      {/* STICKY NAV */}
      <div className="sticky top-16 sm:top-20 z-40 bg-white border-b shadow-sm" data-testid="section-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {navItems.map(item => (
              <button key={item.id} onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${activeSection === item.id ? 'bg-amber-50 text-amber-700' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'}`}>
                <item.icon className="w-3.5 h-3.5" />{item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* LEFT: Main Content */}
          <div className="lg:col-span-2 space-y-10 min-w-0">

            {/* OVERVIEW */}
            <section id="overview" className="scroll-mt-36" data-testid="overview-section">
              <h2 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-amber-600" />Overview</h2>
              <Card className="p-4 sm:p-6 border-0 shadow-md min-w-0"><p className="text-stone-600 leading-relaxed whitespace-pre-line break-words">{pkg.description}</p></Card>
            </section>

            {/* HIGHLIGHTS */}
            <section id="highlights" className="scroll-mt-36" data-testid="highlights-section">
              <h2 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-amber-600" />Tour Highlights</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {pkg.highlights?.map((h, i) => (
                  <Card key={i} className="p-4 border-0 shadow-sm flex items-start gap-3 card-hover">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0"><Camera className="w-4 h-4 text-amber-600" /></div>
                    <p className="text-stone-700 font-medium text-sm">{h}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* ITINERARY */}
            <section id="itinerary" className="scroll-mt-36" data-testid="itinerary-section">
              <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2"><CalendarDays className="w-5 h-5 text-amber-600" />Day-by-Day Itinerary</h2>
              <Accordion type="single" collapsible defaultValue="day-0" className="space-y-3">
                {pkg.itinerary?.map((day, i) => (
                  <AccordionItem key={i} value={`day-${i}`} className="border-0">
                    <AccordionTrigger className="group hover:no-underline p-0 [&>svg]:hidden">
                      <div className="flex items-center gap-3 sm:gap-4 w-full bg-white rounded-xl shadow-sm border border-stone-200 px-3 sm:px-4 py-3 transition-all duration-200 hover:shadow-md hover:border-amber-300 group-data-[state=open]:border-amber-400 group-data-[state=open]:shadow-md">
                        {/* Day number circle */}
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
                          <span className="text-[9px] sm:text-[10px] uppercase font-semibold leading-none tracking-wider">Day</span>
                          <span className="text-sm sm:text-base font-bold leading-none">{day.day || i + 1}</span>
                        </div>
                        {/* Title */}
                        <h3 className="flex-1 text-left font-semibold text-stone-800 text-sm sm:text-base leading-snug">{day.title}</h3>
                        {/* Chevron indicator */}
                        <div className="w-7 h-7 rounded-full bg-amber-50 group-data-[state=open]:bg-amber-100 flex items-center justify-center shrink-0">
                          <ChevronRight className="w-4 h-4 text-amber-600 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0 pt-0">
                      <div className="ml-[1.35rem] sm:ml-6 pl-5 sm:pl-6 border-l-2 border-amber-200 pt-2 pb-1">
                        <div className="bg-stone-50 rounded-xl p-4 sm:p-5 border border-stone-100">
                          <div className="text-sm text-stone-700 leading-relaxed prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-headings:text-stone-800 prose-a:text-amber-700" dangerouslySetInnerHTML={{ __html: day.description }} />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* INCLUSIONS & EXCLUSIONS */}
            <section id="inclusions" className="scroll-mt-36" data-testid="inclusions-section">
              <h2 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-amber-600" />Inclusions & Exclusions</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="p-5 border-0 shadow-md bg-green-50/50">
                  <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2"><CheckCircle className="w-4 h-4" />Inclusions</h3>
                  <ul className="space-y-2">
                    {pkg.inclusions?.map((item, i) => <li key={i} className="flex items-start gap-2 text-sm text-stone-700"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />{item}</li>)}
                  </ul>
                </Card>
                <Card className="p-5 border-0 shadow-md bg-red-50/50">
                  <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2"><XCircle className="w-4 h-4" />Exclusions</h3>
                  <ul className="space-y-2">
                    {pkg.exclusions?.map((item, i) => <li key={i} className="flex items-start gap-2 text-sm text-stone-700"><XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />{item}</li>)}
                  </ul>
                </Card>
              </div>
            </section>

            {/* PRICE TABLE */}
            {pkg.price_table && pkg.price_table.length > 0 && (
              <section id="price-table" className="scroll-mt-36" data-testid="price-table-section">
                <h2 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2"><IndianRupee className="w-5 h-5 text-amber-600" />Price Table for {pkg.title}</h2>
                <Card className="border-0 shadow-md overflow-hidden min-w-0">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[680px] text-sm">
                      <thead>
                        <tr className="bg-amber-600 text-white">
                          <th className="text-left p-3 font-semibold">Package Type</th>
                          <th className="text-center p-3 font-semibold">Single</th>
                          <th className="text-center p-3 font-semibold">Double</th>
                          <th className="text-center p-3 font-semibold">Triple</th>
                          <th className="text-center p-3 font-semibold">Child w/ Bed</th>
                          <th className="text-center p-3 font-semibold">Child w/o Bed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pkg.price_table.map((row, i) => (
                          <tr key={i} className={`border-b ${i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}`}>
                            <td className="p-3 font-semibold text-stone-900">{row.type}</td>
                            <td className="p-3 text-center text-stone-700">Rs {row.single?.toLocaleString('en-IN')}</td>
                            <td className="p-3 text-center text-stone-700">Rs {row.double?.toLocaleString('en-IN')}</td>
                            <td className="p-3 text-center text-stone-700">Rs {row.triple?.toLocaleString('en-IN')}</td>
                            <td className="p-3 text-center text-stone-700">Rs {row.child_with_bed?.toLocaleString('en-IN')}</td>
                            <td className="p-3 text-center text-stone-700">Rs {row.child_without_bed?.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-3 bg-amber-50 text-xs text-stone-500">* Prices per person. Taxes extra as applicable. Prices may vary during peak season.</div>
                </Card>
              </section>
            )}

            {/* HOTELS */}
            {pkg.hotels && pkg.hotels.length > 0 && (
              <section id="hotels" className="scroll-mt-36" data-testid="hotels-section">
                <h2 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2"><Hotel className="w-5 h-5 text-amber-600" />Hotels & Accommodation</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pkg.hotels.map((hotel, i) => (
                    <Card key={i} className="p-4 border-0 shadow-md card-hover flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0"><Building2 className="w-6 h-6 text-amber-600" /></div>
                      <div>
                        <h3 className="font-bold text-stone-900">{hotel.name}</h3>
                        <p className="text-sm text-stone-500 flex items-center gap-1.5"><MapPin className="w-3 h-3" />{hotel.city}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Badge variant="secondary" className="text-xs">{hotel.category}</Badge>
                          {hotel.nights && <span className="text-xs text-stone-400">{hotel.nights} Night{hotel.nights > 1 ? 's' : ''}</span>}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* TOUR MAP */}
            {pkg.tour_map_url && (
              <section id="tour-map" className="scroll-mt-36" data-testid="tour-map-section">
                <h2 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2"><Map className="w-5 h-5 text-amber-600" />Tour Map for {pkg.title}</h2>
                <Card className="border-0 shadow-md overflow-hidden">
                  <iframe src={pkg.tour_map_url} width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg" />
                </Card>
              </section>
            )}

            {/* SEO CONTENT */}
            {pkg.seo_content && (
              <section id="seo-content" className="scroll-mt-36" data-testid="seo-content-section">
                <Card className="border border-stone-200 shadow-sm">
                  <div className="p-4 sm:p-6 min-w-0">
                    <h2 className="text-left font-bold text-stone-900 text-2xl flex items-center gap-2">
                      <FileText className="w-5 h-5 text-amber-600" />More About {pkg.title}
                    </h2>
                    <div className="mt-4 package-seo-readmore">
                      <div className="relative">
                        <div
                          className={`package-seo-body prose prose-sm sm:prose-base lg:prose-lg max-w-none break-words prose-headings:text-stone-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:text-stone-600 prose-p:text-[16px] prose-p:my-3 prose-a:text-gradient prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md prose-blockquote:border-amber-400 prose-blockquote:bg-amber-50/50 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-strong:text-stone-800 prose-li:text-stone-600 prose-li:text-[16px] ${isSeoExpanded ? '' : 'is-collapsed'}`}
                          style={{ lineHeight: 1.6 }}
                          dangerouslySetInnerHTML={{ __html: pkg.seo_content }}
                        />
                        {!isSeoExpanded && (
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsSeoExpanded((prev) => !prev)}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800"
                      >
                        {isSeoExpanded ? 'Read less' : 'Read more'}
                      </button>
                    </div>
                  </div>
                </Card>
              </section>
            )}

            {/* FAQS */}
            {pkg.faqs && pkg.faqs.length > 0 && (
              <section id="faqs" className="scroll-mt-36" data-testid="faqs-section">
                <h2 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-amber-600" />Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {pkg.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-xl border border-stone-200 px-5 shadow-sm">
                      <AccordionTrigger className="text-left font-semibold text-stone-800 hover:text-amber-700 py-4 text-sm">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-stone-600 text-sm leading-relaxed pb-4">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            {/* REVIEWS */}
            {pkg.reviews?.length > 0 && (
              <section data-testid="reviews-section" className="scroll-mt-36">
                <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2"><MessageCircle className="w-5 h-5 text-amber-600" />What Travellers Say</h2>

                {/* Rating Summary Card */}
                <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-amber-50 via-white to-orange-50 mb-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="text-center sm:border-r sm:border-stone-200 sm:pr-6">
                      <div className="text-5xl font-extrabold text-amber-600 mb-1">{pkg.rating || (pkg.reviews.reduce((sum, r) => sum + r.rating, 0) / pkg.reviews.length).toFixed(1)}</div>
                      <div className="flex items-center justify-center gap-0.5 mb-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.round(pkg.rating || (pkg.reviews.reduce((sum, r) => sum + r.rating, 0) / pkg.reviews.length)) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />)}
                      </div>
                      <p className="text-sm text-stone-500">{pkg.reviews.length} Review{pkg.reviews.length > 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex-1 space-y-2 w-full">
                      {[5, 4, 3, 2, 1].map(star => {
                        const count = pkg.reviews.filter(r => r.rating === star).length;
                        const pct = (count / pkg.reviews.length) * 100;
                        return (
                          <div key={star} className="flex items-center gap-2 text-sm">
                            <span className="w-4 text-right text-stone-600 font-medium">{star}</span>
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <div className="flex-1 h-2.5 rounded-full bg-stone-200 overflow-hidden">
                              <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="w-8 text-xs text-stone-400">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>

                {/* Review Cards */}
                <div className="grid sm:grid-cols-2 gap-4 min-w-0">
                  {pkg.reviews.map((r, idx) => (
                    <Card key={r.id} className="p-0 border-0 shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
                      <div className="h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-3 min-w-0">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                              {r.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-stone-900 text-sm break-words">{r.name}</p>
                              <p className="text-xs text-stone-400 flex items-center gap-1">
                                <CalendarDays className="w-3 h-3" />
                                {new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-bold text-amber-700">{r.rating}</span>
                          </div>
                        </div>
                        <div className="relative pl-4">
                          <Quote className="absolute -left-0.5 -top-1 w-4 h-4 text-amber-300" />
                          <p className="text-sm text-stone-600 leading-relaxed break-words">{r.comment}</p>
                        </div>
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-green-600">
                          <Award className="w-3.5 h-3.5" />
                          <span className="font-medium">Verified Traveller</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:col-span-1 min-w-0">
            <div className="sticky top-36 space-y-6">
              {/* Price Card */}
              <Card className="border-0 shadow-xl overflow-hidden min-w-0" data-testid="price-card">
                <div className="bg-amber-600 p-5 text-white text-center">
                  <p className="text-sm opacity-80 mb-1">Starting from</p>
                  <div className="flex items-center justify-center gap-2">
                    {pkg.discounted_price && <span className="text-lg line-through opacity-60">Rs {pkg.price?.toLocaleString('en-IN')}</span>}
                    <span className="text-3xl font-bold">Rs {(pkg.discounted_price || pkg.price)?.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-sm opacity-80">per person</p>
                  {discount > 0 && <Badge className="bg-white text-amber-700 mt-2 border-0">{discount}% OFF</Badge>}
                </div>
                <CardContent className="p-5">
                  <div className="space-y-3 mb-5 text-sm">
                    <div className="flex items-center justify-between"><span className="text-stone-500 flex items-center gap-1.5"><Clock className="w-4 h-4" />Duration</span><span className="font-medium text-stone-900">{pkg.duration}</span></div>
                    <div className="flex items-center justify-between gap-2"><span className="text-stone-500 flex items-center gap-1.5"><MapPin className="w-4 h-4" />Location</span><span className="font-medium text-stone-900 text-right break-words">{pkg.location}</span></div>
                    <div className="flex items-center justify-between"><span className="text-stone-500 flex items-center gap-1.5"><Users className="w-4 h-4" />Group Size</span><span className="font-medium text-stone-900">Max {pkg.max_group_size}</span></div>
                    <div className="flex items-center justify-between gap-2"><span className="text-stone-500 flex items-center gap-1.5"><Star className="w-4 h-4" />Rating</span><span className="font-medium text-stone-900 text-right break-words">{pkg.rating}/5 ({pkg.reviews_count} reviews)</span></div>
                  </div>
                  <Button onClick={() => { setEnquiryPkg(pkg); setEnquiryOpen(true); }} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-5 rounded-xl shadow-lg text-base" data-testid="book-now-btn">
                    <Send className="w-4 h-4 mr-2" />Book Now / Enquire
                  </Button>
                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-stone-400">
                    <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" />Secure Booking</span>
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />24/7 Support</span>
                  </div>
                </CardContent>
              </Card>

              {/* Enquiry Form */}
              <div id="sidebar-enquiry">
                <h3 className="font-bold text-stone-900 mb-3 text-lg">Send Enquiry</h3>
                <EnquiryForm packageId={pkg.id} packageTitle={pkg.title} compact />
              </div>

              {/* Quick Help */}
              <Card className="p-5 border-0 shadow-md bg-stone-900 text-white">
                <h3 className="font-semibold mb-3">Need Help Planning?</h3>
                <p className="text-stone-300 text-sm mb-4">Call our travel experts for a free consultation and customized itinerary.</p>
                <a href={phoneHref}><Button className="w-full bg-amber-500 hover:bg-amber-600 text-white whitespace-normal text-center break-all"><Phone className="w-4 h-4 mr-2" />{phone}</Button></a>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PACKAGES */}
      {related.length > 0 && (
        <section className="section-padding bg-white" data-testid="related-packages">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-stone-900 mb-2">Explore More Rajasthan Tour Packages</h2>
            <p className="text-stone-500 mb-8">Discover other incredible journeys through the royal land of Rajasthan</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0">
              {related.map(p => <PackageCard key={p.id} pkg={p} onEnquire={(p) => { setEnquiryPkg(p); setEnquiryOpen(true); }} />)}
            </div>
          </div>
        </section>
      )}

      {/* CALL TO ACTION */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Plan Your Dream Rajasthan Trip
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Ready to Explore the<br /><span className="text-amber-200">Royal Land of Rajasthan?</span>
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let our travel experts craft the perfect itinerary for you. From majestic forts to golden deserts, 
            experience the magic of Rajasthan with personalized service and unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => { setEnquiryPkg(pkg); setEnquiryOpen(true); }}
              className="w-full sm:w-auto bg-white text-amber-700 hover:bg-amber-50 px-8 py-6 rounded-full text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <Send className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
              Get Free Quote
            </Button>
            <a href={phoneHref}>
              <Button className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-full text-base font-bold whitespace-normal text-center transition-all duration-300">
                <Phone className="w-4 h-4 mr-2" />
                Call {phone}
              </Button>
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" />100% Secure Booking</span>
            <span className="flex items-center gap-1.5"><Heart className="w-4 h-4" />Handcrafted Itineraries</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4" />Trusted by 10,000+ Travellers</span>
            <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" />24/7 Support</span>
          </div>
        </div>
      </section>

      <EnquiryDialog
        open={enquiryOpen}
        onOpenChange={(open) => { setEnquiryOpen(open); if (!open) setEnquiryPkg(null); }}
        packageId={enquiryPkg?.id}
        packageTitle={enquiryPkg?.title}
      />
      <style jsx global>{`
        @media (max-width: 640px) {
          [data-testid='package-detail-page'] section,
          [data-testid='package-detail-page'] div,
          [data-testid='package-detail-page'] article,
          [data-testid='package-detail-page'] aside {
            min-width: 0;
          }
          [data-testid='package-detail-page'] iframe,
          [data-testid='package-detail-page'] img {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
