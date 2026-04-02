import 'server-only';

import { supabaseAdmin } from '@/lib/supabase';
import { IMG_OG_DEFAULT } from '@/lib/image-config';

const SLUG_GOVERNANCE_TABLE = 'slug_governance';
const MISSING_TABLE_CODES = new Set(['42P01', 'PGRST205']);

const DEFAULTS = {
  title: 'Rajasthan Tours - Authentic Travel Experiences',
  description:
    'Discover Rajasthan with curated tour packages, local guides, heritage stays, and reliable travel support.',
  image: IMG_OG_DEFAULT,
  keywords:
    'Rajasthan tours, Rajasthan tour packages, Jaipur, Udaipur, Jaisalmer, Jodhpur, desert safari, heritage tours',
};

function isMissingTableError(error) {
  if (!error) return false;
  if (MISSING_TABLE_CODES.has(error.code)) return true;
  return typeof error.message === 'string' && error.message.toLowerCase().includes('does not exist');
}

function normalizeCanonical(canonical = '/') {
  if (!canonical) return '/';
  if (/^https?:\/\//i.test(canonical)) {
    try {
      const url = new URL(canonical);
      return `${url.pathname || '/'}${url.search || ''}`;
    } catch {
      return '/';
    }
  }
  return canonical.startsWith('/') ? canonical : `/${canonical}`;
}

function cleanTitle(value) {
  if (!value) return DEFAULTS.title;
  return String(value).trim().replace(/\s*\|\s*Rajasthan Tours\s*$/i, '');
}

export function buildMetadata({
  title,
  description,
  canonical = '/',
  type = 'website',
  image,
  keywords,
  noIndex = false,
} = {}) {
  const finalTitle = cleanTitle(title);
  const finalDescription = description || DEFAULTS.description;
  const finalCanonical = normalizeCanonical(canonical);
  const finalImage = image || DEFAULTS.image;

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    keywords: keywords || DEFAULTS.keywords,
    alternates: { canonical: finalCanonical },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: finalCanonical,
      type,
      images: [{ url: finalImage, alt: finalTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
    },
  };
}

function resourceTypeToPath(resourceType, slug) {
  if (resourceType === 'package') return `/tour-packages/${slug}`;
  if (resourceType === 'blog') return `/blogs/${slug}`;
  return null;
}

export async function resolveSlugGovernance(resourceType, sourceSlug) {
  if (!supabaseAdmin || !resourceType || !sourceSlug) return null;

  const { data, error } = await supabaseAdmin
    .from(SLUG_GOVERNANCE_TABLE)
    .select('resource_type,source_slug,target_slug,status_code')
    .eq('resource_type', resourceType)
    .eq('source_slug', sourceSlug)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    if (isMissingTableError(error)) return null;
    return null;
  }
  if (!data) return null;

  if (data.status_code >= 300 && data.status_code < 400 && data.target_slug) {
    const destination = resourceTypeToPath(resourceType, data.target_slug);
    if (destination) return { type: 'redirect', statusCode: data.status_code, destination };
  }
  if (data.status_code === 410) {
    return { type: 'gone', statusCode: 410 };
  }

  return null;
}

export async function registerSlugRedirect(resourceType, fromSlug, toSlug) {
  if (!supabaseAdmin || !resourceType || !fromSlug || !toSlug || fromSlug === toSlug) return;

  const { error } = await supabaseAdmin.from(SLUG_GOVERNANCE_TABLE).upsert(
    {
      resource_type: resourceType,
      source_slug: fromSlug,
      target_slug: toSlug,
      status_code: 301,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'resource_type,source_slug' },
  );

  if (error && !isMissingTableError(error)) {
    console.error('Failed to register slug redirect:', error);
  }
}

export async function registerSlugGone(resourceType, slug) {
  if (!supabaseAdmin || !resourceType || !slug) return;

  const { error } = await supabaseAdmin.from(SLUG_GOVERNANCE_TABLE).upsert(
    {
      resource_type: resourceType,
      source_slug: slug,
      target_slug: null,
      status_code: 410,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'resource_type,source_slug' },
  );

  if (error && !isMissingTableError(error)) {
    console.error('Failed to register removed slug:', error);
  }
}

export async function clearSlugGovernanceEntry(resourceType, sourceSlug) {
  if (!supabaseAdmin || !resourceType || !sourceSlug) return;
  const { error } = await supabaseAdmin
    .from(SLUG_GOVERNANCE_TABLE)
    .delete()
    .eq('resource_type', resourceType)
    .eq('source_slug', sourceSlug);

  if (error && !isMissingTableError(error)) {
    console.error('Failed to clear slug governance entry:', error);
  }
}

/* ═══════════════════════════════════════════════════════════
   JSON-LD Schema Helpers — single source of truth
   ═══════════════════════════════════════════════════════════ */

/**
 * Build a BreadcrumbList JSON-LD schema.
 * @param {Array<{name:string, url?:string}>} items — ordered breadcrumb items.
 *        The last item is treated as the current page (no `item` URL).
 */
export function buildBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => {
      const el = { '@type': 'ListItem', position: index + 1, name: entry.name };
      if (entry.url) el.item = entry.url;
      return el;
    }),
  };
}

/**
 * Build a FAQPage JSON-LD schema.
 * @param {Array<{question:string, answer:string}>} faqs
 */
export function buildFAQPageSchema(faqs = []) {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question || faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer || faq.a,
      },
    })),
  };
}

/**
 * Build an ItemList JSON-LD schema.
 * @param {string} name
 * @param {Array<{name:string, url:string}>} items
 */
export function buildItemListSchema(name, items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: item.url,
      name: item.name,
    })),
  };
}
