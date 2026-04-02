import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const ALLOWED_SLOTS = new Set([
  'about-us',
  'cta-background',
  'og-image',
  'destinations-hero',
  'destination-default',
  'itinerary-weekend',
  'itinerary-classic',
  'itinerary-grand',
  'itinerary-complete',
  'city-delhi',
  'city-mumbai',
  'city-bangalore',
  'city-kolkata',
  'city-ahmedabad',
  'city-hyderabad',
]);

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.webp', '.png', '.avif']);

export const dynamic = 'force-dynamic';

function getPublicOrigin(request) {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return request.nextUrl.origin;
}

export async function GET(_request, { params }) {
  const { slot } = await params;

  if (!ALLOWED_SLOTS.has(slot)) {
    return NextResponse.json({ error: 'Invalid image slot' }, { status: 400 });
  }

  try {
    const publicOrigin = getPublicOrigin(_request);
    const dir = path.join(process.cwd(), 'public', 'images', slot);

    if (!fs.existsSync(dir)) {
      return NextResponse.redirect(new URL('/favicon.ico', publicOrigin), 307);
    }

    const files = fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()) && !f.startsWith('.'))
      .sort((a, b) => a.localeCompare(b));

    if (files.length === 0) {
      return NextResponse.redirect(new URL('/favicon.ico', publicOrigin), 307);
    }

    const target = `/images/${slot}/${files[0]}`;
    return NextResponse.redirect(new URL(target, publicOrigin), 307);
  } catch {
    const publicOrigin = getPublicOrigin(_request);
    return NextResponse.redirect(new URL('/favicon.ico', publicOrigin), 307);
  }
}
