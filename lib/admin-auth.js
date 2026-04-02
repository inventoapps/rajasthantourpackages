export const ADMIN_COOKIE_NAME = 'sb_admin_access_token';
export const ADMIN_REFRESH_COOKIE_NAME = 'sb_admin_refresh_token';

export function isSupabaseAuthConfigured() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

function getAllowedEmailsSet() {
  const raw = process.env.ADMIN_ALLOWED_EMAILS || '';
  return new Set(
    raw
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

export function isAllowedAdminEmail(email) {
  const allowed = getAllowedEmailsSet();
  if (allowed.size === 0) return true;
  return !!email && allowed.has(email.toLowerCase());
}

export async function validateSupabaseAccessToken(accessToken) {
  if (!isSupabaseAuthConfigured() || !accessToken) return null;

  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) return null;
  const user = await response.json();
  if (!isAllowedAdminEmail(user?.email)) return null;
  return user;
}

export async function refreshSupabaseSession(refreshToken) {
  if (!isSupabaseAuthConfigured() || !refreshToken) return null;

  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
    cache: 'no-store',
  });

  if (!response.ok) return null;
  const data = await response.json();
  if (!data?.access_token || !data?.refresh_token || !data?.user) return null;
  if (!isAllowedAdminEmail(data.user?.email)) return null;
  return data;
}
