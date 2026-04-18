import 'server-only';

import { supabaseAdmin } from '@/lib/supabase';
import { STATIC_BLOGS, STATIC_PACKAGES, STATIC_REVIEWS, STATIC_DESTINATIONS } from '@/lib/data';
import { IMG_CTA_DESERT } from '@/lib/image-config';
import { mergeWithStaticData } from '@/lib/supabase-sql-helper';

const DEFAULT_HOMEPAGE_SETTINGS = {
  id: 'homepage',
  hero_image_url: IMG_CTA_DESERT,
  hero_image_alt: 'Rajasthan',
  hero_title: 'Discover the Royal Rajasthan',
  hero_subtitle:
    'Explore magnificent forts, shimmering lakes, golden deserts, and centuries of heritage with our expertly crafted tour packages.',
  hero_button_text: 'Explore Packages',
  hero_secondary_button_text: 'Free Consultation',
  seo_content: '',
  meta_title: 'Rajasthan Tours - Authentic Travel Experiences',
  meta_description:
    'Discover the royal heritage of Rajasthan with our expertly crafted tour packages. Experience Jaipur, Udaipur, Jaisalmer and more.',
  meta_keywords: 'Rajasthan tours, Jaipur, Udaipur, Jaisalmer, desert safari, heritage tours',
};

export async function getHomepageSettings() {
  if (!supabaseAdmin) return DEFAULT_HOMEPAGE_SETTINGS;
  const { data, error } = await supabaseAdmin
    .from('homepage_settings')
    .select('*')
    .eq('id', 'homepage')
    .single();
  if (error && error.code !== 'PGRST116') return DEFAULT_HOMEPAGE_SETTINGS;
  return data || DEFAULT_HOMEPAGE_SETTINGS;
}

const DEFAULT_SITE_SETTINGS = {
  id: 'site',
  site_name: 'Rajasthan Tours',
  logo_url: '',
  logo_alt: 'Rajasthan Tours Logo',
  logo_width: 160,
  logo_height: 50,
  favicon_url: '',
  favicon_alt: 'Rajasthan Tours Favicon',
  og_default_image_url: '',
  og_default_image_alt: 'Rajasthan Tour Packages',
  business_phone: '+91 98765 43210',
  business_email: 'info@rajasthantours.com',
  business_address: '123 MI Road, Jaipur, Rajasthan 302001, India',
  business_hours: 'Mon-Sat: 9AM - 7PM',
  google_maps_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227749.05387025368!2d75.64830659226562!3d26.88511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000',
};

export async function getSiteSettings() {
  if (!supabaseAdmin) return DEFAULT_SITE_SETTINGS;
  try {
    // First try the normal PostgREST select
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .select('*')
      .eq('id', 'site')
      .single();

    if (error) return DEFAULT_SITE_SETTINGS;

    const merged = { ...DEFAULT_SITE_SETTINGS, ...(data || {}) };

    // Ensure missing or empty string values fall back to defaults
    Object.keys(DEFAULT_SITE_SETTINGS).forEach((key) => {
      if (merged[key] === undefined || merged[key] === null || merged[key] === '') {
        merged[key] = DEFAULT_SITE_SETTINGS[key];
      }
    });

    // If PostgREST cache is stale and columns are missing, use raw SQL fallback
    if (data && typeof data.business_phone === 'undefined') {
      try {
        const { data: sqlData } = await supabaseAdmin.rpc('exec_sql', {
          query: `SELECT * FROM site_settings WHERE id = 'site' LIMIT 1;`
        });
        const raw = Array.isArray(sqlData) ? sqlData[0] : sqlData;
        if (raw && typeof raw === 'object') {
          const fixed = { ...DEFAULT_SITE_SETTINGS, ...raw };
          Object.keys(DEFAULT_SITE_SETTINGS).forEach((key) => {
            if (fixed[key] === undefined || fixed[key] === null || fixed[key] === '') {
              fixed[key] = DEFAULT_SITE_SETTINGS[key];
            }
          });
          return fixed;
        }
      } catch {
        // exec_sql not available — fall through to merged result
      }
    }

    return merged;
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function getPackages({
  category,
  featured,
  search,
  duration,
  limit = 100,
  exclude,
} = {}) {
  if (supabaseAdmin) {
    let q = supabaseAdmin.from('tour_packages').select('*').eq('is_active', true);
    if (category && category !== 'all') q = q.eq('category', category);
    if (featured === true) q = q.eq('is_featured', true);
    if (search) q = q.or(`title.ilike.%${search}%,location.ilike.%${search}%`);
    if (duration) q = q.ilike('duration', `${duration} Day%`);
    if (exclude) q = q.neq('id', exclude);
    q = q.order('is_featured', { ascending: false }).order('rating', { ascending: false }).limit(limit);
    const { data, error } = await q;
    if (!error) return (data || []).map(mergeWithStaticData);
    return [];
  }

  let filtered = STATIC_PACKAGES.filter((p) => p.is_active);
  if (category && category !== 'all') filtered = filtered.filter((p) => p.category === category);
  if (featured === true) filtered = filtered.filter((p) => p.is_featured);
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (p) => p.title.toLowerCase().includes(s) || p.location.toLowerCase().includes(s),
    );
  }
  if (duration) {
    filtered = filtered.filter((p) => {
      const m = p.duration?.match(/(\d+)\s*Day/i);
      return m && m[1] === String(duration);
    });
  }
  if (exclude) filtered = filtered.filter((p) => p.id !== exclude);
  return filtered.slice(0, limit);
}

export async function getPackageBySlug(slug) {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin.from('tour_packages').select('*').eq('slug', slug).single();
    if (!error && data) {
      const { data: reviews } = await supabaseAdmin
        .from('reviews')
        .select('*')
        .eq('package_id', data.id)
        .order('created_at', { ascending: false });
      return { ...mergeWithStaticData(data), reviews: reviews || [] };
    }
    return null;
  }
  const pkg = STATIC_PACKAGES.find((p) => p.slug === slug);
  if (!pkg) return null;
  return { ...pkg, reviews: STATIC_REVIEWS.filter((r) => r.package_id === pkg.id) };
}

export async function getPackageSlugs() {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('tour_packages')
      .select('slug,is_active')
      .eq('is_active', true);
    if (!error) return (data || []).map((p) => p.slug);
    return [];
  }
  return STATIC_PACKAGES.filter((p) => p.is_active).map((p) => p.slug);
}

export async function getBlogs({ category, published = true, limit = 100 } = {}) {
  if (supabaseAdmin) {
    let q = supabaseAdmin.from('blogs').select('*');
    if (published) q = q.eq('is_published', true);
    if (category && category !== 'all') q = q.eq('category', category);
    q = q.order('created_at', { ascending: false }).limit(limit);
    const { data, error } = await q;
    if (!error && data?.length > 0) return data;
  }
  let blogs = STATIC_BLOGS;
  if (published) blogs = blogs.filter((b) => b.is_published);
  if (category && category !== 'all') blogs = blogs.filter((b) => b.category === category);
  return blogs.slice(0, limit);
}

export async function getBlogBySlug(slug) {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin.from('blogs').select('*').eq('slug', slug).single();
    if (!error && data) return data;
  }
  return STATIC_BLOGS.find((b) => b.slug === slug) || null;
}

export async function getBlogSlugs() {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('slug,is_published')
      .eq('is_published', true);
    if (!error && data?.length > 0) return data.map((b) => b.slug);
  }
  return STATIC_BLOGS.filter((b) => b.is_published).map((b) => b.slug);
}

/** Lightweight nav data for the dynamic header dropdowns */
export async function getNavData() {
  const [tours, blogs, destinations] = await Promise.all([
    getPackages({ limit: 8 }),            // max 8 tours, sorted by featured + rating
    getBlogs({ published: true, limit: 5 }), // max 5 blogs, latest first
    getDestinations({ activeOnly: true }),  // active destinations for nav dropdown
  ]);
  return {
    tours: tours.map(({ title, slug, location, duration, category }) => ({ title, slug, location, duration, category })),
    blogs: blogs.map(({ title, slug, category, image_url }) => ({ title, slug, category, image_url })),
    destinations: destinations.map(({ name, slug, tagline, image_url }) => ({ name, slug, tagline, image_url })),
  };
}

export async function getReviews({ packageId, limit } = {}) {
  if (supabaseAdmin) {
    let q = supabaseAdmin.from('reviews').select('*').order('created_at', { ascending: false });
    if (packageId) q = q.eq('package_id', packageId);
    if (limit) q = q.limit(limit);
    const { data, error } = await q;
    if (!error && data?.length > 0) return data;
  }
  let rows = packageId ? STATIC_REVIEWS.filter((r) => r.package_id === packageId) : STATIC_REVIEWS;
  if (limit) rows = rows.slice(0, limit);
  return rows;
}

/* ───── Destinations ───── */

export async function getDestinations({ activeOnly = true } = {}) {
  if (supabaseAdmin) {
    let q = supabaseAdmin.from('destinations').select('*');
    if (activeOnly) q = q.eq('is_active', true);
    q = q.order('display_order', { ascending: true });
    const { data, error } = await q;
    if (!error && data?.length > 0) return data;
  }
  let dests = STATIC_DESTINATIONS;
  if (activeOnly) dests = dests.filter((d) => d.is_active);
  return dests.sort((a, b) => a.display_order - b.display_order);
}

export async function getDestinationBySlug(slug) {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin.from('destinations').select('*').eq('slug', slug).single();
    if (!error && data) return data;
  }
  return STATIC_DESTINATIONS.find((d) => d.slug === slug) || null;
}

export async function getDestinationSlugs() {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('destinations')
      .select('slug,is_active')
      .eq('is_active', true);
    if (!error && data?.length > 0) return data.map((d) => d.slug);
  }
  return STATIC_DESTINATIONS.filter((d) => d.is_active).map((d) => d.slug);
}
