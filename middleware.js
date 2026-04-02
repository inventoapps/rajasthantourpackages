import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  ADMIN_REFRESH_COOKIE_NAME,
  refreshSupabaseSession,
  validateSupabaseAccessToken,
} from './lib/admin-auth';

const TRACKING_PARAMS = new Set([
  'gclid',
  'fbclid',
  'msclkid',
  'mc_cid',
  'mc_eid',
  'igshid',
]);

function unauthorizedApi() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

function isAlwaysAdminApi(pathname) {
  return (
    pathname === '/api/sql' ||
    pathname === '/api/seed' ||
    pathname === '/api/setup-sql' ||
    pathname === '/api/alter-sql' ||
    pathname === '/api/setup-check' ||
    pathname === '/api/setup-sql-exec' ||
    pathname === '/api/health'
  );
}

function isAdminProtectedApi(pathname, method) {
  if (isAlwaysAdminApi(pathname)) return true;
  if (pathname.startsWith('/api/admin/') && pathname !== '/api/admin/login' && pathname !== '/api/admin/logout') return true;
  if (pathname === '/api/homepage-settings' && method !== 'GET') return true;
  if (pathname === '/api/site-settings' && method !== 'GET') return true;
  if (pathname === '/api/enquiries' && method !== 'POST') return true;
  if (pathname.startsWith('/api/enquiries/')) return true;
  if ((pathname === '/api/packages' || pathname.startsWith('/api/packages/')) && method !== 'GET') return true;
  if ((pathname === '/api/blogs' || pathname.startsWith('/api/blogs/')) && method !== 'GET') return true;
  if ((pathname === '/api/destinations' || pathname.startsWith('/api/destinations/')) && method !== 'GET') return true;
  if (pathname === '/api/seed-destinations') return true;
  return false;
}

function shouldSkipNormalization(pathname) {
  if (!pathname) return true;
  if (pathname.startsWith('/_next/')) return true;
  if (pathname.startsWith('/api/')) return true;
  if (pathname === '/favicon.ico' || pathname === '/robots.txt' || pathname === '/sitemap.xml') return true;
  if (/\.[a-z0-9]+$/i.test(pathname)) return true;
  return false;
}

function normalizedPathname(pathname) {
  if (!pathname) return '/';
  let out = pathname.replace(/\/{2,}/g, '/');
  if (out !== '/' && out.endsWith('/')) out = out.slice(0, -1);
  out = out.toLowerCase();
  return out || '/';
}

function stripTrackingParams(url) {
  const next = new URL(url.toString());
  let changed = false;

  for (const key of Array.from(next.searchParams.keys())) {
    const lowerKey = key.toLowerCase();
    if (lowerKey.startsWith('utm_') || TRACKING_PARAMS.has(lowerKey)) {
      next.searchParams.delete(key);
      changed = true;
    }
  }

  return changed ? next : null;
}

function enforcePreferredHost(request) {
  // Canonical host redirects are opt-in because some hosts/proxies
  // (including shared hosting setups) can cause redirect loops.
  // Enable only when explicitly needed.
  if (process.env.ENFORCE_CANONICAL_HOST !== 'true') return null;
  if (process.env.NODE_ENV !== 'production') return null;

  const configuredBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!configuredBaseUrl) return null;

  let preferred;
  try {
    preferred = new URL(configuredBaseUrl);
  } catch {
    return null;
  }

  const current = request.nextUrl;
  if (current.hostname === preferred.hostname) return null;

  const target = new URL(request.url);
  target.protocol = preferred.protocol;
  target.hostname = preferred.hostname;
  target.port = preferred.port;
  return target;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const refreshToken = request.cookies.get(ADMIN_REFRESH_COOKIE_NAME)?.value;
  let nextAccessToken = null;
  let nextRefreshToken = null;
  let shouldClearAuthCookies = false;

  function withAuthCookies(response) {
    if (shouldClearAuthCookies) {
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

    if (nextAccessToken && nextRefreshToken) {
      response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: nextAccessToken,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24,
      });
      response.cookies.set({
        name: ADMIN_REFRESH_COOKIE_NAME,
        value: nextRefreshToken,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    return response;
  }

  let authorized = null;
  async function isAuthorized() {
    if (authorized !== null) return authorized;

    const user = token ? await validateSupabaseAccessToken(token) : null;
    if (user) {
      authorized = true;
      return authorized;
    }

    const refreshed = refreshToken ? await refreshSupabaseSession(refreshToken) : null;
    if (refreshed?.access_token && refreshed?.refresh_token) {
      nextAccessToken = refreshed.access_token;
      nextRefreshToken = refreshed.refresh_token;
      authorized = true;
      return authorized;
    }

    shouldClearAuthCookies = !!(token || refreshToken);
    authorized = false;
    return authorized;
  }

  if (!pathname.startsWith('/admin') && !shouldSkipNormalization(pathname)) {
    const preferredHostUrl = enforcePreferredHost(request);
    if (preferredHostUrl) {
      return withAuthCookies(NextResponse.redirect(preferredHostUrl, 308));
    }
    const targetPath = normalizedPathname(pathname);
    if (targetPath !== pathname) {
      const targetUrl = new URL(request.url);
      targetUrl.pathname = targetPath;
      return withAuthCookies(NextResponse.redirect(targetUrl, 308));
    }
    const cleanedUrl = stripTrackingParams(request.nextUrl);
    if (cleanedUrl) {
      return withAuthCookies(NextResponse.redirect(cleanedUrl, 308));
    }
  }

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      if (await isAuthorized()) {
        return withAuthCookies(NextResponse.redirect(new URL('/admin', request.url)));
      }
      const response = NextResponse.next();
      response.headers.set('x-pathname', pathname);
      return withAuthCookies(response);
    }
    if (!(await isAuthorized())) {
      return withAuthCookies(NextResponse.redirect(new URL('/admin/login', request.url)));
    }
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    return withAuthCookies(response);
  }

  if (isAdminProtectedApi(pathname, method) && !(await isAuthorized())) {
    return withAuthCookies(unauthorizedApi());
  }

  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  return withAuthCookies(response);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
