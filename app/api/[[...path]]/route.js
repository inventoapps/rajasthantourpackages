import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';
import { STATIC_PACKAGES, STATIC_BLOGS, STATIC_REVIEWS, STATIC_DESTINATIONS, HOMEPAGE_FAQS, SETUP_SQL, ALTER_SQL } from '@/lib/data';
import { checkMigrationStatus, mergeWithStaticData } from '@/lib/supabase-sql-helper';
import {
  clearSlugGovernanceEntry,
  registerSlugGone,
  registerSlugRedirect,
  resolveSlugGovernance,
} from '@/lib/seo-governance';

const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization' };
const json = (data, s = 200) => NextResponse.json(data, { status: s, headers: CORS });
const err = (msg, s = 500) => NextResponse.json({ error: msg }, { status: s, headers: CORS });

const TOUR_EXTRA_COLS = ['price_table', 'hotels', 'tour_map_url', 'seo_content', 'faqs'];
const BLOG_EXTRA_COLS = ['image_alt', 'title_alt', 'faqs', 'seo_content'];

function stripExtraCols(obj, cols) {
  const clean = { ...obj };
  cols.forEach(c => delete clean[c]);
  return clean;
}

function revalidatePackagePaths(slug) {
  revalidatePath('/');
  revalidatePath('/tour-packages');
  if (slug) revalidatePath(`/tour-packages/${slug}`);
  revalidatePath('/sitemap.xml');
  revalidatePath('/sitemap-packages.xml');
}

function revalidateBlogPaths(slug) {
  revalidatePath('/');
  revalidatePath('/blogs');
  if (slug) revalidatePath(`/blogs/${slug}`);
  revalidatePath('/sitemap.xml');
  revalidatePath('/sitemap-blogs.xml');
}

const DEST_EXTRA_COLS = ['gallery', 'how_to_reach', 'key_attractions', 'travel_tips', 'faqs', 'best_time_details'];

function revalidateDestinationPaths(slug) {
  revalidatePath('/');
  revalidatePath('/destinations');
  if (slug) revalidatePath(`/destinations/${slug}`);
  revalidatePath('/sitemap.xml');
  revalidatePath('/sitemap-destinations.xml');
}

export async function OPTIONS() { return new NextResponse(null, { status: 200, headers: CORS }); }

export async function GET(request, context) {
  try {
    const { path: pathArr } = await context.params;
    const path = pathArr || [];
    const p = path.join('/');
    const { searchParams } = new URL(request.url);

    if (p === 'health') {
      let db = 'not_configured';
      if (supabaseAdmin) {
        const { error } = await supabaseAdmin.from('tour_packages').select('id').limit(1);
        db = error ? 'tables_missing' : 'connected';
      }
      return json({ status: 'ok', database: db });
    }
    if (p === 'setup-sql') return json({ sql: SETUP_SQL });
    if (p === 'alter-sql') return json({ sql: ALTER_SQL });
    if (p === 'setup-check') return json(await checkMigrationStatus());
    if (p === 'homepage-faqs') return json(HOMEPAGE_FAQS);

    // PACKAGES
    if (p === 'packages') {
      const cat = searchParams.get('category');
      const featured = searchParams.get('featured');
      const search = searchParams.get('search');
      const duration = searchParams.get('duration');
      const limit = parseInt(searchParams.get('limit')) || 100;
      const exclude = searchParams.get('exclude');

      if (supabaseAdmin) {
        let q = supabaseAdmin.from('tour_packages').select('*').eq('is_active', true);
        if (cat && cat !== 'all') q = q.eq('category', cat);
        if (featured === 'true') q = q.eq('is_featured', true);
        if (search) q = q.or(`title.ilike.%${search}%,location.ilike.%${search}%`);
        if (duration) q = q.ilike('duration', `${duration} Day%`);
        if (exclude) q = q.neq('id', exclude);
        q = q.order('is_featured', { ascending: false }).order('rating', { ascending: false }).limit(limit);
        const { data, error } = await q;
        if (!error && data?.length > 0) return json(data.map(mergeWithStaticData));
      }
      let filtered = STATIC_PACKAGES.filter(p => p.is_active);
      if (cat && cat !== 'all') filtered = filtered.filter(p => p.category === cat);
      if (featured === 'true') filtered = filtered.filter(p => p.is_featured);
      if (search) { const s = search.toLowerCase(); filtered = filtered.filter(p => p.title.toLowerCase().includes(s) || p.location.toLowerCase().includes(s)); }
      if (duration) { filtered = filtered.filter(p => { const m = p.duration?.match(/(\d+)\s*Day/i); return m && m[1] === duration; }); }
      if (exclude) filtered = filtered.filter(p => p.id !== exclude);
      return json(filtered.slice(0, limit));
    }

    // PACKAGE BY SLUG
    if (path[0] === 'packages' && path[1]) {
      const slug = path[1];
      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin.from('tour_packages').select('*').eq('slug', slug).single();
        if (!error && data) {
          const { data: reviews } = await supabaseAdmin.from('reviews').select('*').eq('package_id', data.id).order('created_at', { ascending: false });
          return json({ ...mergeWithStaticData(data), reviews: reviews || [] });
        }
      }
      const pkg = STATIC_PACKAGES.find(p => p.slug === slug);
      if (pkg) return json({ ...pkg, reviews: STATIC_REVIEWS.filter(r => r.package_id === pkg.id) });
      const governance = await resolveSlugGovernance('package', slug);
      if (governance?.type === 'redirect') {
        return json({ redirect_to: governance.destination }, governance.statusCode || 301);
      }
      if (governance?.type === 'gone') {
        return err('Package removed', 410);
      }
      return err('Package not found', 404);
    }

    // BLOGS
    if (p === 'blogs') {
      const cat = searchParams.get('category');
      const published = searchParams.get('published') !== 'false';
      const limit = parseInt(searchParams.get('limit')) || 100;
      if (supabaseAdmin) {
        let q = supabaseAdmin.from('blogs').select('*');
        if (published) q = q.eq('is_published', true);
        if (cat && cat !== 'all') q = q.eq('category', cat);
        q = q.order('created_at', { ascending: false }).limit(limit);
        const { data, error } = await q;
        if (!error && data?.length > 0) return json(data);
      }
      let blogs = STATIC_BLOGS;
      if (published) blogs = blogs.filter(b => b.is_published);
      if (cat && cat !== 'all') blogs = blogs.filter(b => b.category === cat);
      return json(blogs.slice(0, limit));
    }

    if (path[0] === 'blogs' && path[1]) {
      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin.from('blogs').select('*').eq('slug', path[1]).single();
        if (!error && data) return json(data);
      }
      const blog = STATIC_BLOGS.find(b => b.slug === path[1]);
      if (blog) return json(blog);
      const governance = await resolveSlugGovernance('blog', path[1]);
      if (governance?.type === 'redirect') {
        return json({ redirect_to: governance.destination }, governance.statusCode || 301);
      }
      if (governance?.type === 'gone') {
        return err('Blog removed', 410);
      }
      return err('Blog not found', 404);
    }

    // ENQUIRIES
    if (p === 'enquiries') {
      if (supabaseAdmin) {
        let q = supabaseAdmin.from('enquiries').select('*');
        const status = searchParams.get('status');
        if (status && status !== 'all') q = q.eq('status', status);
        const { data, error } = await q.order('created_at', { ascending: false });
        if (!error) return json(data || []);
      }
      return json([]);
    }

    // DESTINATIONS
    if (p === 'destinations') {
      const activeOnly = searchParams.get('active') !== 'false';
      if (supabaseAdmin) {
        let q = supabaseAdmin.from('destinations').select('*');
        if (activeOnly) q = q.eq('is_active', true);
        q = q.order('display_order', { ascending: true });
        const { data, error } = await q;
        if (!error && data?.length > 0) return json(data);
      }
      let dests = STATIC_DESTINATIONS;
      if (activeOnly) dests = dests.filter(d => d.is_active);
      return json(dests.sort((a, b) => a.display_order - b.display_order));
    }

    if (path[0] === 'destinations' && path[1]) {
      const slug = path[1];
      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin.from('destinations').select('*').eq('slug', slug).single();
        if (!error && data) return json(data);
      }
      const dest = STATIC_DESTINATIONS.find(d => d.slug === slug);
      if (dest) return json(dest);
      return err('Destination not found', 404);
    }

    // REVIEWS
    if (p === 'reviews') {
      const pkgId = searchParams.get('package_id');
      if (supabaseAdmin) {
        let q = supabaseAdmin.from('reviews').select('*').order('created_at', { ascending: false });
        if (pkgId) q = q.eq('package_id', pkgId);
        const { data, error } = await q;
        if (!error && data?.length > 0) return json(data);
      }
      return json(pkgId ? STATIC_REVIEWS.filter(r => r.package_id === pkgId) : STATIC_REVIEWS);
    }

    return err('Not found', 404);
  } catch (e) { console.error('GET error:', e); return err(e.message); }
}

export async function POST(request, context) {
  try {
    const { path: pathArr } = await context.params;
    const path = pathArr || [];
    const p = path.join('/');
    const body = await request.json();

    if (p === 'enquiries') {
      if (!body.name || !body.email) return err('Name and email required', 400);
      const enquiry = { id: `enq-${Date.now()}-${Math.random().toString(36).substr(2,6)}`, ...body, status: 'pending', created_at: new Date().toISOString() };
      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin.from('enquiries').insert(enquiry).select().single();
        if (error) return err('Failed to save enquiry: ' + error.message, 500);
        return json({ success: true, enquiry: data }, 201);
      } else {
        return err('Database not configured', 500);
      }
    }

    if (p === 'packages') {
      if (!supabaseAdmin) return err('Database not configured', 500);
      const id = `pkg-${Date.now()}-${Math.random().toString(36).substr(2,6)}`;
      const pkg = { id, ...body, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      let { data, error } = await supabaseAdmin.from('tour_packages').insert(pkg).select().single();
      if (error?.code === '42703') {
        ({ data, error } = await supabaseAdmin.from('tour_packages').insert(stripExtraCols(pkg, TOUR_EXTRA_COLS)).select().single());
      }
      if (error) return err(error.message);
      await clearSlugGovernanceEntry('package', data?.slug);
      revalidatePackagePaths(data?.slug);
      return json(data, 201);
    }

    if (p === 'blogs') {
      if (!supabaseAdmin) return err('Database not configured', 500);
      const id = `blog-${Date.now()}-${Math.random().toString(36).substr(2,6)}`;
      const blog = { id, ...body, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      let { data, error } = await supabaseAdmin.from('blogs').insert(blog).select().single();
      // Handle schema cache issues - try without extra columns if needed
      if (error?.code === '42703' || error?.message?.includes('schema cache')) {
        ({ data, error } = await supabaseAdmin.from('blogs').insert(stripExtraCols(blog, BLOG_EXTRA_COLS)).select().single());
      }
      if (error) return err(error.message);
      await clearSlugGovernanceEntry('blog', data?.slug);
      revalidateBlogPaths(data?.slug);
      return json(data, 201);
    }

    if (p === 'destinations') {
      if (!supabaseAdmin) return err('Database not configured', 500);
      const id = `dest-${Date.now()}-${Math.random().toString(36).substr(2,6)}`;
      const dest = { id, ...body, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      delete dest.undefined;
      let { data, error } = await supabaseAdmin.from('destinations').insert(dest).select().maybeSingle();
      if (error?.code === '42703') {
        ({ data, error } = await supabaseAdmin.from('destinations').insert(stripExtraCols(dest, DEST_EXTRA_COLS)).select().maybeSingle());
      }
      if (error) return err(error.message);
      if (!data) return err('Insert succeeded but no row returned — check RLS policies', 500);
      revalidateDestinationPaths(data?.slug);
      return json(data, 201);
    }

    if (p === 'seed-destinations') {
      if (!supabaseAdmin) return err('Database not configured', 500);
      let inserted = 0;
      const errors = [];
      for (const dest of STATIC_DESTINATIONS) {
        // Check if already exists
        const { data: existing } = await supabaseAdmin.from('destinations').select('id').eq('id', dest.id).maybeSingle();
        if (existing) continue; // already in DB
        let { data, error } = await supabaseAdmin.from('destinations').insert(dest).select().maybeSingle();
        if (error?.code === '42703') {
          ({ data, error } = await supabaseAdmin.from('destinations').insert(stripExtraCols(dest, DEST_EXTRA_COLS)).select().maybeSingle());
        }
        if (error) {
          errors.push(`${dest.name}: ${error.message}`);
        } else {
          inserted++;
        }
      }
      revalidatePath('/');
      revalidatePath('/destinations');
      revalidatePath('/sitemap.xml');
      revalidatePath('/sitemap-destinations.xml');
      STATIC_DESTINATIONS.forEach(d => d.slug && revalidatePath(`/destinations/${d.slug}`));
      if (errors.length > 0) return json({ success: false, inserted, errors }, 207);
      return json({ success: true, inserted });
    }

    if (p === 'seed') {
      if (!supabaseAdmin) return err('Database not configured', 500);
      await supabaseAdmin.from('reviews').delete().neq('id', '');
      await supabaseAdmin.from('enquiries').delete().neq('id', '');
      await supabaseAdmin.from('blogs').delete().neq('id', '');
      await supabaseAdmin.from('tour_packages').delete().neq('id', '');

      // Try with all columns first, fallback to base columns
      let { data: pkgs, error: pkgErr } = await supabaseAdmin.from('tour_packages').insert(STATIC_PACKAGES).select();
      if (pkgErr?.code === '42703' || pkgErr?.message?.includes('schema cache')) {
        ({ data: pkgs, error: pkgErr } = await supabaseAdmin.from('tour_packages').insert(STATIC_PACKAGES.map(p => stripExtraCols(p, TOUR_EXTRA_COLS))).select());
      }
      if (pkgErr) return err(`Seed packages failed: ${pkgErr.message}`);

      let { data: blogs, error: blogErr } = await supabaseAdmin.from('blogs').insert(STATIC_BLOGS).select();
      if (blogErr?.code === '42703' || blogErr?.message?.includes('schema cache')) {
        ({ data: blogs, error: blogErr } = await supabaseAdmin.from('blogs').insert(STATIC_BLOGS.map(b => stripExtraCols(b, BLOG_EXTRA_COLS))).select());
      }
      if (blogErr) return err(`Seed blogs failed: ${blogErr.message}`);
      
      const { data: revs } = await supabaseAdmin.from('reviews').insert(STATIC_REVIEWS).select();

      // Seed destinations if table exists
      let destCount = 0;
      try {
        await supabaseAdmin.from('destinations').delete().neq('id', '');
        let { data: dests, error: destErr } = await supabaseAdmin.from('destinations').insert(STATIC_DESTINATIONS).select();
        if (destErr?.code === '42703') {
          ({ data: dests, error: destErr } = await supabaseAdmin.from('destinations').insert(STATIC_DESTINATIONS.map(d => stripExtraCols(d, DEST_EXTRA_COLS))).select());
        }
        if (!destErr) destCount = dests?.length || 0;
        else console.log('[SEED] destinations seed skipped:', destErr.message);
      } catch (e) { console.log('[SEED] destinations table may not exist:', e.message); }

      revalidatePath('/');
      revalidatePath('/blogs');
      revalidatePath('/tour-packages');
      revalidatePath('/destinations');
      revalidatePath('/sitemap.xml');
      revalidatePath('/sitemap-pages.xml');
      revalidatePath('/sitemap-packages.xml');
      revalidatePath('/sitemap-blogs.xml');
      revalidatePath('/sitemap-destinations.xml');
      return json({ success: true, packages: pkgs?.length || 0, blogs: blogs?.length || 0, reviews: revs?.length || 0, destinations: destCount });
    }

    return err('Not found', 404);
  } catch (e) { console.error('POST error:', e); return err(e.message); }
}

export async function PUT(request, context) {
  try {
    const { path: pathArr } = await context.params;
    const path = pathArr || [];
    console.log('[PUT] path:', path);
    const body = await request.json();
    if (!supabaseAdmin) return err('Database not configured', 500);

    if (path[0] === 'packages' && path[1]) {
      const { data: existingPkg } = await supabaseAdmin
        .from('tour_packages')
        .select('slug')
        .eq('id', path[1])
        .single();
      const update = { ...body, updated_at: new Date().toISOString() };
      let { data, error } = await supabaseAdmin.from('tour_packages').update(update).eq('id', path[1]).select().single();
      if (error?.code === '42703') {
        ({ data, error } = await supabaseAdmin.from('tour_packages').update(stripExtraCols(update, TOUR_EXTRA_COLS)).eq('id', path[1]).select().single());
      }
      if (error) return err(error.message);
      if (existingPkg?.slug && data?.slug && existingPkg.slug !== data.slug) {
        await registerSlugRedirect('package', existingPkg.slug, data.slug);
      }
      await clearSlugGovernanceEntry('package', data?.slug);
      revalidatePackagePaths(existingPkg?.slug);
      revalidatePackagePaths(data?.slug);
      return json(data);
    }
    if (path[0] === 'blogs' && path[1]) {
      const { data: existingBlog } = await supabaseAdmin
        .from('blogs')
        .select('slug')
        .eq('id', path[1])
        .single();
      const update = { ...body, updated_at: new Date().toISOString() };
      let { data, error } = await supabaseAdmin.from('blogs').update(update).eq('id', path[1]).select().single();
      // Handle schema cache issues - try without extra columns if needed
      if (error?.code === '42703' || error?.message?.includes('schema cache')) {
        ({ data, error } = await supabaseAdmin.from('blogs').update(stripExtraCols(update, BLOG_EXTRA_COLS)).eq('id', path[1]).select().single());
      }
      if (error) return err(error.message);
      if (existingBlog?.slug && data?.slug && existingBlog.slug !== data.slug) {
        await registerSlugRedirect('blog', existingBlog.slug, data.slug);
      }
      await clearSlugGovernanceEntry('blog', data?.slug);
      revalidateBlogPaths(existingBlog?.slug);
      revalidateBlogPaths(data?.slug);
      return json(data);
    }
    if (path[0] === 'destinations' && path[1]) {
      const destId = path[1];
      const now = new Date().toISOString();

      // First, check if the row already exists in DB
      const existingResult = await supabaseAdmin.from('destinations').select('slug').eq('id', destId).maybeSingle();
      console.log('[DEST PUT] destId:', destId, 'existing:', existingResult.data ? 'yes' : 'no', 'existErr:', existingResult.error?.message || 'none');

      if (existingResult.error && !existingResult.error.message?.includes('does not exist')) {
        // Some other DB error (not "table doesn't exist")
        console.log('[DEST PUT] existing check error:', existingResult.error);
      }

      if (existingResult.data) {
        // Row exists in DB — update it
        const update = { ...body, updated_at: now };
        delete update.id;
        delete update.created_at;
        let { data, error } = await supabaseAdmin.from('destinations').update(update).eq('id', destId).select().maybeSingle();
        if (error?.code === '42703') {
          ({ data, error } = await supabaseAdmin.from('destinations').update(stripExtraCols(update, DEST_EXTRA_COLS)).eq('id', destId).select().maybeSingle());
        }
        if (error) return err(error.message);
        revalidateDestinationPaths(existingResult.data?.slug);
        revalidateDestinationPaths(data?.slug);
        return json(data || { id: destId, ...body, updated_at: now });
      } else {
        // Row not in DB — insert (first-time save from static data)
        const row = { ...body, id: destId, created_at: now, updated_at: now };
        console.log('[DEST PUT→INSERT] ID:', destId, 'body keys:', Object.keys(row));
        let { data, error } = await supabaseAdmin.from('destinations').insert(row).select().maybeSingle();
        console.log('[DEST PUT→INSERT] result:', { data: !!data, errMsg: error?.message, code: error?.code });

        if (error?.code === '42703') {
          const stripped = stripExtraCols(row, DEST_EXTRA_COLS);
          console.log('[DEST PUT→INSERT] retrying stripped, keys:', Object.keys(stripped));
          ({ data, error } = await supabaseAdmin.from('destinations').insert(stripped).select().maybeSingle());
          console.log('[DEST PUT→INSERT] retry result:', { data: !!data, errMsg: error?.message });
        }

        // If table doesn't exist, tell user to run setup SQL
        if (error?.message?.includes('does not exist')) {
          return err('Destinations table not found in database. Please run the setup SQL first (Admin → Setup → Run SQL).', 500);
        }
        if (error) return err(error.message);
        revalidateDestinationPaths(data?.slug || body.slug);
        return json(data || { id: destId, ...body, created_at: now, updated_at: now });
      }
    }
    if (path[0] === 'enquiries' && path[1]) {
      const { data, error } = await supabaseAdmin.from('enquiries').update(body).eq('id', path[1]).select().single();
      if (error) return err(error.message);
      return json(data);
    }
    return err('Not found', 404);
  } catch (e) { console.error('PUT error:', e); return err(e.message); }
}

export async function DELETE(request, context) {
  try {
    const { path: pathArr } = await context.params;
    const path = pathArr || [];
    if (!supabaseAdmin) return err('Database not configured', 500);
    const table = path[0] === 'packages' ? 'tour_packages' : path[0] === 'blogs' ? 'blogs' : path[0] === 'enquiries' ? 'enquiries' : path[0] === 'destinations' ? 'destinations' : null;
    if (table && path[1]) {
      let oldSlug = null;
      if (table === 'tour_packages' || table === 'blogs' || table === 'destinations') {
        const { data } = await supabaseAdmin.from(table).select('slug').eq('id', path[1]).single();
        oldSlug = data?.slug || null;
      }
      const { error } = await supabaseAdmin.from(table).delete().eq('id', path[1]);
      if (error) return err(error.message);
      if (table === 'tour_packages' && oldSlug) await registerSlugGone('package', oldSlug);
      if (table === 'blogs' && oldSlug) await registerSlugGone('blog', oldSlug);
      if (table === 'tour_packages') revalidatePackagePaths(oldSlug);
      if (table === 'blogs') revalidateBlogPaths(oldSlug);
      if (table === 'destinations') revalidateDestinationPaths(oldSlug);
      return json({ success: true });
    }
    return err('Not found', 404);
  } catch (e) { console.error('DELETE error:', e); return err(e.message); }
}
