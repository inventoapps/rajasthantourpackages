import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    serviceKeyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length,
    serviceKeyStart: process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20)
  });
}