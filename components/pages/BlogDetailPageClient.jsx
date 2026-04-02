'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Home, ChevronRight, ArrowLeft, ArrowRight, Calendar,
  User, Tag, HelpCircle, Phone, MessageCircle, Share2,
  Clock, BookOpen, Folder, Sparkles, Send, Facebook,
  Twitter, Linkedin, Copy, CheckCircle,
} from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';
import EnquiryDialog from '@/components/shared/EnquiryDialog';

/* ── helpers ─────────────────────────────────────────── */
function fmtLong(v) {
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return '';
  const m = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return `${d.getUTCDate()} ${m[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
function fmtShort(v) {
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return '';
  return `${String(d.getUTCDate()).padStart(2,'0')}/${String(d.getUTCMonth()+1).padStart(2,'0')}/${d.getUTCFullYear()}`;
}
function readTime(html) {
  if (!html) return '3 min read';
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

const CAT_COLORS = {
  'travel-guide': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', badge: 'bg-blue-500' },
  'travel-tips':  { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', badge: 'bg-emerald-500' },
  'food':         { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', badge: 'bg-orange-500' },
  'adventure':    { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', badge: 'bg-red-500' },
  'luxury':       { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', badge: 'bg-purple-500' },
  'culture':      { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', badge: 'bg-pink-500' },
  'heritage':     { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', badge: 'bg-amber-500' },
  'spiritual':    { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', badge: 'bg-indigo-500' },
  'wildlife':     { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', badge: 'bg-teal-500' },
};
function catStyle(c) { return CAT_COLORS[c] || { bg: 'bg-stone-50', text: 'text-stone-700', border: 'border-stone-200', badge: 'bg-stone-500' }; }
function catLabel(c) { return (c || '').replace(/-/g, ' '); }

import { IMG_CTA_DESERT, IMG_DESTINATION_DEFAULT } from '@/lib/image-config';

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function BlogDetailPage({ blog, relatedBlogs = [], allBlogs = [], siteSettings }) {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const phone = siteSettings?.business_phone || '+91 98765 43210';
  const phoneHref = `tel:${phone.replace(/[\s\-()]/g, '')}`;

  /* derive categories from all blogs */
  const categories = useMemo(() => {
    const map = {};
    allBlogs.forEach(b => {
      if (!b.category) return;
      map[b.category] = (map[b.category] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [allBlogs]);

  /* share helpers */
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = blog.title;
  const copyLink = () => {
    navigator.clipboard?.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cs = catStyle(blog.category);

  return (
    <div className="min-h-screen bg-stone-50" data-testid="blog-detail-page">

      {/* ── HERO ── */}
      <div className="pt-16 sm:pt-20">
        <div className="relative h-[45vh] min-h-[340px] sm:h-[50vh]">
          <Image
            src={blog.image_url}
            alt={blog.image_alt || blog.title}
            fill sizes="100vw" priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-10">
              <Badge className={`${cs.badge} text-white border-0 mb-3 capitalize text-xs px-3 py-1`}>
                {catLabel(blog.category)}
              </Badge>
              <h1
                className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl leading-tight"
                title={blog.title_alt || blog.title}
              >
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/80 text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />{fmtLong(blog.created_at)}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />{blog.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />{readTime(blog.seo_content || blog.content)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── ENQUIRE BUTTON BAR (below hero image) ── */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <p className="text-white text-sm sm:text-base font-medium">
              <Sparkles className="w-4 h-4 inline mr-1.5 -mt-0.5" />
              Planning a trip to Rajasthan? Get a free custom itinerary!
            </p>
            <Button
              onClick={() => setEnquiryOpen(true)}
              className="bg-white text-amber-700 hover:bg-amber-50 rounded-full px-5 sm:px-6 font-semibold shadow-lg text-sm shrink-0"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" />Enquire Now
            </Button>
          </div>
        </div>
      </div>

      {/* ── BREADCRUMB ── */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-stone-400">
            <Link href="/" className="hover:text-amber-700 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blogs" className="hover:text-amber-700">Blogs</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-stone-600 line-clamp-1 max-w-[200px] sm:max-w-md">{blog.title}</span>
          </nav>
        </div>
      </div>

      {/* ═════════ MAIN CONTENT + SIDEBAR ═════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">

          {/* ── LEFT: Article Content ── */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
              {/* Excerpt */}
              {blog.excerpt && (
                <div className="px-6 sm:px-8 pt-8 pb-4">
                  <p className="text-lg text-stone-600 italic border-l-4 border-amber-400 pl-4 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              )}

              {/* Main Content / SEO Content */}
              <div className="px-6 sm:px-8 py-6">
                {blog.seo_content ? (
                  <div
                    className="prose prose-lg prose-stone max-w-none prose-headings:text-stone-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:text-stone-600 prose-p:text-[16px] prose-a:text-gradient prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md prose-blockquote:border-amber-400 prose-blockquote:bg-amber-50/50 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-strong:text-stone-800 prose-li:text-stone-600 prose-li:text-[16px]"
                    style={{ lineHeight: 1.6 }}
                    dangerouslySetInnerHTML={{ __html: blog.seo_content }}
                  />
                ) : blog.content ? (
                  <div
                    className="prose prose-lg prose-stone max-w-none prose-headings:text-stone-900 prose-headings:font-bold prose-p:leading-relaxed prose-p:text-stone-600 prose-p:text-[16px] prose-a:text-gradient prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-li:text-[16px]"
                    style={{ lineHeight: 1.6 }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                ) : (
                  <p className="text-stone-500">No content available for this article.</p>
                )}
              </div>

              {/* FAQs */}
              {blog.faqs?.length > 0 && (
                <div className="px-6 sm:px-8 pb-8">
                  <div className="border-t border-stone-100 pt-8">
                    <h2 className="text-2xl font-bold text-stone-900 mb-5 flex items-center gap-2">
                      <HelpCircle className="w-6 h-6 text-amber-600" />
                      Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="space-y-3">
                      {blog.faqs.map((faq, i) => (
                        <AccordionItem
                          key={i} value={`faq-${i}`}
                          className="bg-stone-50 rounded-xl border border-stone-200 px-5 shadow-sm"
                        >
                          <AccordionTrigger className="text-left font-semibold text-stone-800 hover:text-amber-700 py-4 text-sm sm:text-base">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-stone-600 text-sm leading-relaxed pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              )}

              {/* Tags + Share */}
              <div className="px-6 sm:px-8 pb-8">
                <div className="border-t border-stone-100 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Tags */}
                  {blog.tags?.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag className="w-4 h-4 text-stone-400" />
                      {blog.tags.map(t => (
                        <Badge key={t} variant="secondary" className="text-xs bg-stone-100 hover:bg-amber-50 hover:text-amber-700 transition-colors">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {/* Share */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400 font-medium mr-1">Share:</span>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-stone-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center text-stone-500 transition-colors"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareTitle)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-stone-100 hover:bg-sky-100 hover:text-sky-600 flex items-center justify-center text-stone-500 transition-colors"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-stone-100 hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center text-stone-500 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={copyLink}
                      className="w-8 h-8 rounded-full bg-stone-100 hover:bg-amber-100 hover:text-amber-700 flex items-center justify-center text-stone-500 transition-colors"
                    >
                      {copied ? <CheckCircle className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Back Button */}
            <div className="mt-6">
              <Link href="/blogs">
                <Button variant="outline" className="rounded-full border-stone-300 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />Back to All Posts
                </Button>
              </Link>
            </div>

            {/* ── RELATED POSTS (below article on desktop, also mobile) ── */}
            {relatedBlogs.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-amber-600" />
                  You Might Also Like
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {relatedBlogs.map(b => {
                    const bcs = catStyle(b.category);
                    return (
                      <Link key={b.id} href={`/blogs/${b.slug}`}>
                        <Card className="overflow-hidden group cursor-pointer h-full border-0 shadow-md hover:shadow-xl transition-all duration-300">
                          <div className="relative h-44 overflow-hidden">
                            <Image
                              src={b.image_url}
                              alt={b.image_alt || b.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <Badge className={`absolute top-3 left-3 ${bcs.badge} text-white border-0 capitalize text-xs`}>
                              {catLabel(b.category)}
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <p className="text-xs text-stone-400 mb-1.5 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />{fmtShort(b.created_at)}
                            </p>
                            <h3 className="font-bold text-stone-900 text-sm sm:text-base group-hover:text-amber-700 transition-colors line-clamp-2">
                              {b.title}
                            </h3>
                            {b.excerpt && (
                              <p className="text-xs text-stone-500 mt-2 line-clamp-2">{b.excerpt}</p>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 lg:self-start">

            {/* Sidebar Enquiry CTA */}
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="bg-gradient-to-br from-amber-600 via-amber-600 to-orange-600 p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Plan Your Trip</h3>
                    <p className="text-amber-100 text-xs">Free personalized itinerary</p>
                  </div>
                </div>
                <p className="text-amber-50 text-sm leading-relaxed mb-4">
                  Love what you read? Let our travel experts craft a custom Rajasthan tour just for you.
                </p>
                <Button
                  onClick={() => setEnquiryOpen(true)}
                  className="w-full bg-white text-amber-700 hover:bg-amber-50 rounded-full font-semibold shadow-md"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />Get Free Quote
                </Button>
                <p className="text-center text-amber-200 text-xs mt-3">
                  ✓ No obligation &nbsp;·&nbsp; ✓ 24hr response
                </p>
              </div>
              <div className="bg-white p-4 border-t border-amber-100">
                <a href={phoneHref} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Call us directly</p>
                    <p className="text-sm font-semibold text-stone-800 group-hover:text-amber-700 transition-colors">
                      {phone}
                    </p>
                  </div>
                </a>
              </div>
            </Card>

            {/* Categories */}
            {categories.length > 0 && (
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="bg-stone-900 px-5 py-4">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Folder className="w-4 h-4 text-amber-400" />Blog Categories
                  </h3>
                </div>
                <div className="p-4 space-y-1.5">
                  {categories.map(([cat, count]) => {
                    const s = catStyle(cat);
                    const isActive = cat === blog.category;
                    return (
                      <Link
                        key={cat}
                        href={`/blogs?category=${cat}`}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          isActive
                            ? `${s.bg} ${s.text} ${s.border} border`
                            : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                        }`}
                      >
                        <span className="capitalize">{catLabel(cat)}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          isActive ? `${s.badge} text-white` : 'bg-stone-100 text-stone-500'
                        }`}>
                          {count}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* Recent Posts (Sidebar) */}
            {relatedBlogs.length > 0 && (
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="bg-stone-900 px-5 py-4">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-400" />Recent Posts
                  </h3>
                </div>
                <div className="divide-y divide-stone-100">
                  {relatedBlogs.slice(0, 4).map(b => (
                    <Link
                      key={b.id}
                      href={`/blogs/${b.slug}`}
                      className="flex gap-3 p-4 group hover:bg-stone-50 transition-colors"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={b.image_url}
                          alt={b.image_alt || b.title}
                          fill sizes="64px"
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-stone-800 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                          {b.title}
                        </h4>
                        <p className="text-xs text-stone-400 mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />{fmtShort(b.created_at)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}

            {/* Sidebar CTA 2: Tour Packages */}
            <Card className="border-0 shadow-md overflow-hidden">
              {IMG_DESTINATION_DEFAULT && (
              <div className="relative h-36">
                <Image
                  src={IMG_DESTINATION_DEFAULT}
                  alt="Rajasthan Tour Packages"
                  fill sizes="(max-width: 1024px) 100vw, 33vw"
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-amber-300 text-xs font-semibold uppercase tracking-wide">Explore</p>
                  <p className="text-white font-bold text-lg">Rajasthan Tour Packages</p>
                </div>
              </div>
              )}
              <div className="p-4">
                <p className="text-sm text-stone-600 mb-3">
                  From heritage walks to desert safaris — find the perfect package for your dream Rajasthan trip.
                </p>
                <Link href="/tour-packages">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-full text-sm">
                    View All Packages <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Share Widget */}
            <Card className="border-0 shadow-md p-5">
              <h3 className="font-bold text-stone-900 text-sm mb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-amber-600" />Share This Article
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareTitle)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-sky-500 text-white text-xs font-medium hover:bg-sky-600 transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" />Twitter
                </a>
                <button
                  onClick={copyLink}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    copied
                      ? 'bg-green-100 text-green-700'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </Card>
          </aside>
        </div>
      </div>

      {/* ── FULL-WIDTH CTA BANNER ── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          {IMG_CTA_DESERT && (
            <Image
              src={IMG_CTA_DESERT}
              alt="Plan your Rajasthan trip"
              fill sizes="100vw"
              unoptimized
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 via-amber-800/85 to-orange-900/90" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Sparkles className="w-8 h-8 text-amber-300 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Experience Rajasthan?
          </h2>
          <p className="text-amber-100/90 text-lg mb-8 max-w-2xl mx-auto">
            Turn your travel inspiration into reality. Our experts will design a personalized itinerary based on your preferences, timeline, and budget.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={() => setEnquiryOpen(true)}
              className="bg-white text-amber-700 hover:bg-amber-50 px-8 py-6 text-base rounded-full font-semibold shadow-xl"
            >
              <Send className="w-4 h-4 mr-2" />Get Free Quote
            </Button>
            <Link href="/tour-packages">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base rounded-full">
                <BookOpen className="w-4 h-4 mr-2" />Browse Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY POPUP ── */}
      <EnquiryDialog
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        title="Plan Your Rajasthan Trip"
        description="Tell us your travel preferences and our experts will design the perfect itinerary for you."
      />
    </div>
  );
}
