export function getBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_BASE_URL || 'https://rajasthantourandpackages.com';
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

export function toAbsoluteUrl(path = '/') {
  const base = getBaseUrl();
  if (!path) return base;
  if (/^https?:\/\//i.test(path)) return path;
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}
