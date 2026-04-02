import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const { data, error } = await supabaseAdmin
      .from('homepage_settings')
      .select('*')
      .eq('id', 'homepage')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error fetching homepage settings:', error);
      return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }

    // Return default values if no settings exist
    const settings = data || {
      id: 'homepage',
      hero_image_url: '/api/image-slot/cta-background',
      hero_image_alt: 'Rajasthan',
      hero_title: 'Discover the Royal Rajasthan',
      hero_subtitle: 'Explore magnificent forts, shimmering lakes, golden deserts, and centuries of heritage with our expertly crafted tour packages.',
      hero_button_text: 'Explore Packages',
      hero_secondary_button_text: 'Free Consultation',
      seo_content: '',
      meta_title: 'Rajasthan Tours - Authentic Travel Experiences',
      meta_description: 'Discover the royal heritage of Rajasthan with our expertly crafted tour packages. Experience Jaipur, Udaipur, Jaisalmer and more.',
      meta_keywords: 'Rajasthan tours, Jaipur, Udaipur, Jaisalmer, desert safari, heritage tours'
    };

    return NextResponse.json(settings);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Create client directly instead of using imported one
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
    
    console.log('Direct client created, URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Service key exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

    const settings = await request.json();
    console.log('Received settings:', settings);

    // Validate required fields
    if (!settings.hero_title || !settings.hero_subtitle) {
      return NextResponse.json({ error: 'Hero title and subtitle are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('homepage_settings')
      .upsert({
        id: 'homepage',
        hero_image_url: settings.hero_image_url,
        hero_image_alt: settings.hero_image_alt,
        hero_title: settings.hero_title,
        hero_subtitle: settings.hero_subtitle,
        hero_button_text: settings.hero_button_text,
        hero_secondary_button_text: settings.hero_secondary_button_text,
        seo_content: settings.seo_content,
        meta_title: settings.meta_title,
        meta_description: settings.meta_description,
        meta_keywords: settings.meta_keywords,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    console.log('Supabase response:', { data, error });

    if (error) {
      console.error('Error saving homepage settings:', error);
      return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
    }

    revalidatePath('/');
    revalidatePath('/sitemap.xml');

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
