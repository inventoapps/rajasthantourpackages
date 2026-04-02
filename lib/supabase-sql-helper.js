import { supabaseAdmin } from './supabase';
import { STATIC_PACKAGES } from './data';

export async function executeSql(query) {
  // Using Supabase's REST API - we cannot execute raw SQL directly
  // This function is kept for backward compatibility but migrations
  // need to be run manually in Supabase SQL Editor
  return { success: false, error: 'Direct SQL execution not available. Please run migrations in Supabase SQL Editor.' };
}

export async function runMigrations() {
  // Check current status and provide guidance
  const status = await checkMigrationStatus();
  return {
    success: status.configured && Object.values(status.tables).every(v => v),
    status,
    message: 'Please run SQL migrations manually in Supabase SQL Editor',
  };
}

export async function checkMigrationStatus() {
  if (!supabaseAdmin) return { configured: false, tables: {}, hasExtendedFields: false, hasBlogExtendedFields: false };
  const tables = {};
  for (const t of ['tour_packages', 'blogs', 'enquiries', 'reviews', 'homepage_settings', 'slug_governance', 'destinations']) {
    const { error } = await supabaseAdmin.from(t).select('id').limit(1);
    tables[t] = !error;
  }
  let hasExtendedFields = false;
  let hasBlogExtendedFields = false;
  if (tables.tour_packages) {
    const { error } = await supabaseAdmin.from('tour_packages').select('price_table').limit(1);
    hasExtendedFields = !error;
  }
  if (tables.blogs) {
    const { error } = await supabaseAdmin.from('blogs').select('image_alt').limit(1);
    hasBlogExtendedFields = !error;
  }
  return { configured: true, tables, hasExtendedFields, hasBlogExtendedFields };
}

// Merge DB data with static data for missing fields
export function mergeWithStaticData(dbPkg) {
  const staticPkg = STATIC_PACKAGES.find(p => p.id === dbPkg.id || p.slug === dbPkg.slug);
  if (!staticPkg) return dbPkg;
  return {
    ...dbPkg,
    price_table: (dbPkg.price_table && dbPkg.price_table.length > 0) ? dbPkg.price_table : (staticPkg.price_table || []),
    hotels: (dbPkg.hotels && dbPkg.hotels.length > 0) ? dbPkg.hotels : (staticPkg.hotels || []),
    tour_map_url: dbPkg.tour_map_url || staticPkg.tour_map_url || '',
    seo_content: dbPkg.seo_content || staticPkg.seo_content || '',
    faqs: (dbPkg.faqs && dbPkg.faqs.length > 0) ? dbPkg.faqs : (staticPkg.faqs || []),
  };
}
