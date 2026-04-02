import { getNavData, getSiteSettings } from '@/lib/public-content';
import DynamicHeaderClient from './DynamicHeaderClient';

/**
 * Server component that fetches lightweight nav data (tours + blogs)
 * and site settings (logo, branding) then passes to the client header.
 *
 * Props:
 *   variant – "solid" (default white bg) | "transparent" (hero overlay)
 */
export default async function PublicHeader({ variant = 'solid' }) {
  let navData = { tours: [], blogs: [], destinations: [] };
  let siteSettings = null;
  try {
    [navData, siteSettings] = await Promise.all([
      getNavData(),
      getSiteSettings(),
    ]);
  } catch (e) {
    console.error('[PublicHeader] Failed to fetch nav/site data:', e);
  }

  return (
    <DynamicHeaderClient
      tours={navData.tours}
      blogs={navData.blogs}
      destinations={navData.destinations}
      variant={variant}
      siteSettings={siteSettings}
    />
  );
}
