import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  ADMIN_COOKIE_NAME,
  ADMIN_REFRESH_COOKIE_NAME,
  isAllowedAdminEmail,
  isSupabaseAuthConfigured,
} from '@/lib/admin-auth';

export async function POST(request) {
  try {
    if (!isSupabaseAuthConfigured()) {
      return NextResponse.json(
        { error: 'Supabase authentication is not configured on server' },
        { status: 500 }
      );
    }

    const { email, password } = await request.json();
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data?.session?.access_token || !data?.session?.refresh_token || !data?.user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (!isAllowedAdminEmail(data.user.email)) {
      return NextResponse.json({ error: 'This account is not allowed for admin access' }, { status: 403 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: data.session.access_token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    response.cookies.set({
      name: ADMIN_REFRESH_COOKIE_NAME,
      value: data.session.refresh_token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Login failed' }, { status: 500 });
  }
}
