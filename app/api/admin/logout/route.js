import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, ADMIN_REFRESH_COOKIE_NAME } from '@/lib/admin-auth';

export async function POST() {
  const response = NextResponse.json({ success: true });
  for (const name of [ADMIN_COOKIE_NAME, ADMIN_REFRESH_COOKIE_NAME]) {
    response.cookies.set({
      name,
      value: '',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0,
    });
  }
  return response;
}
