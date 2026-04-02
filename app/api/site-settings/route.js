import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

const DEFAULT_SETTINGS = {
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

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(DEFAULT_SETTINGS);
    }

    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .select('*')
      .eq('id', 'site')
      .single();

    if (error && error.code !== 'PGRST116') {
      // Table might not exist yet — return defaults gracefully
      if (error.code === '42P01' || error.code === 'PGRST204' || error.message?.includes('does not exist') || error.message?.includes('relation')) {
        return NextResponse.json(DEFAULT_SETTINGS);
      }
      console.error('Error fetching site settings:', error);
      return NextResponse.json(DEFAULT_SETTINGS);
    }

    return NextResponse.json({ ...DEFAULT_SETTINGS, ...(data || {}) });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(DEFAULT_SETTINGS);
  }
}

export async function POST(request) {
  try {
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const settings = await request.json();

    // Ensure the table exists — create it if not
    try {
      await client.rpc('exec_sql', {
        query: `
          CREATE TABLE IF NOT EXISTS site_settings (
            id TEXT PRIMARY KEY DEFAULT 'site',
            site_name TEXT DEFAULT 'Rajasthan Tours',
            logo_url TEXT DEFAULT '',
            logo_alt TEXT DEFAULT 'Rajasthan Tours Logo',
            logo_width INTEGER DEFAULT 160,
            logo_height INTEGER DEFAULT 50,
            favicon_url TEXT DEFAULT '',
            favicon_alt TEXT DEFAULT 'Rajasthan Tours Favicon',
            og_default_image_url TEXT DEFAULT '',
            og_default_image_alt TEXT DEFAULT 'Rajasthan Tour Packages',
            business_phone TEXT DEFAULT '+91 98765 43210',
            business_email TEXT DEFAULT 'info@rajasthantours.com',
            business_address TEXT DEFAULT '123 MI Road, Jaipur, Rajasthan 302001, India',
            business_hours TEXT DEFAULT 'Mon-Sat: 9AM - 7PM',
            google_maps_embed_url TEXT DEFAULT '',
            updated_at TIMESTAMPTZ DEFAULT now()
          );
          NOTIFY pgrst, 'reload schema';
        `
      });
    } catch (e) {
      // exec_sql might not exist — try raw insert anyway
      console.log('exec_sql not available, proceeding with upsert:', e.message);
    }

    // Use raw SQL to bypass PostgREST schema cache issues with new columns
    const payload = {
      site_name: settings.site_name || 'Rajasthan Tours',
      logo_url: settings.logo_url || '',
      logo_alt: settings.logo_alt || 'Rajasthan Tours Logo',
      logo_width: settings.logo_width || 160,
      logo_height: settings.logo_height || 50,
      favicon_url: settings.favicon_url || '',
      favicon_alt: settings.favicon_alt || 'Rajasthan Tours Favicon',
      og_default_image_url: settings.og_default_image_url || '',
      og_default_image_alt: settings.og_default_image_alt || 'Rajasthan Tour Packages',
      business_phone: settings.business_phone ?? '+91 98765 43210',
      business_email: settings.business_email ?? 'info@rajasthantours.com',
      business_address: settings.business_address ?? '123 MI Road, Jaipur, Rajasthan 302001, India',
      business_hours: settings.business_hours ?? 'Mon-Sat: 9AM - 7PM',
      google_maps_embed_url: settings.google_maps_embed_url ?? '',
    };

    // Try PostgREST upsert first; fall back to raw SQL if schema cache is stale
    let data, error;
    ({ data, error } = await client
      .from('site_settings')
      .upsert({
        id: 'site',
        ...payload,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single());

    if (error && (error.message?.includes('schema cache') || error.message?.includes('column') || error.code === 'PGRST204')) {
      console.log('PostgREST cache stale, falling back to raw SQL upsert');
      const cols = Object.keys(payload);
      const vals = cols.map((_, i) => `$${i + 2}`);
      const updates = cols.map((c, i) => `${c} = $${i + 2}`);
      const sqlParams = ['site', ...cols.map(c => payload[c])];

      const { data: rpcData, error: rpcError } = await client.rpc('exec_sql', {
        query: `
          INSERT INTO site_settings (id, ${cols.join(', ')}, updated_at)
          VALUES ($1, ${vals.join(', ')}, now())
          ON CONFLICT (id) DO UPDATE SET ${updates.join(', ')}, updated_at = now()
          RETURNING *;
        `.replace(/\$(\d+)/g, (_, n) => {
          const v = sqlParams[parseInt(n) - 1];
          return typeof v === 'number' ? v : `'${String(v).replace(/'/g, "''")}'`;
        })
      });

      if (rpcError) {
        console.error('Error saving site settings via SQL:', rpcError);
        return NextResponse.json({ error: rpcError.message || 'Failed to save settings' }, { status: 500 });
      }
      data = payload; // Return the payload we saved
      error = null;
    }

    if (error) {
      console.error('Error saving site settings:', error);
      return NextResponse.json({ error: error.message || 'Failed to save settings' }, { status: 500 });
    }

    // Revalidate all pages since logo/favicon affects everything
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/tour-packages');
    revalidatePath('/blogs');
    revalidatePath('/about');
    revalidatePath('/contact');

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
