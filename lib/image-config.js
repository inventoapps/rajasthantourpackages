/**
 * Image slot URLs.
 *
 * Each URL is served by /api/image-slot/[slot], which resolves the first image
 * file inside the corresponding folder under public/images/<slot>/.
 * This lets you upload files with any SEO filename.
 */

export const IMG_ABOUT_US = '/api/image-slot/about-us';
export const IMG_CTA_DESERT = '/api/image-slot/cta-background';
// OG image must be a direct path (not API redirect) — social crawlers don't follow 307s
export const IMG_OG_DEFAULT = '/images/og-image/Best%20Rajasthan%20tour%20packages%20.webp';
export const IMG_DESTINATIONS_HERO = '/api/image-slot/destinations-hero';
export const IMG_DESTINATION_DEFAULT = '/api/image-slot/destination-default';

export const IMG_ITINERARY_WEEKEND = '/api/image-slot/itinerary-weekend';
export const IMG_ITINERARY_CLASSIC = '/api/image-slot/itinerary-classic';
export const IMG_ITINERARY_GRAND = '/api/image-slot/itinerary-grand';
export const IMG_ITINERARY_COMPLETE = '/api/image-slot/itinerary-complete';

export const IMG_CITY_DELHI = '/api/image-slot/city-delhi';
export const IMG_CITY_MUMBAI = '/api/image-slot/city-mumbai';
export const IMG_CITY_BANGALORE = '/api/image-slot/city-bangalore';
export const IMG_CITY_KOLKATA = '/api/image-slot/city-kolkata';
export const IMG_CITY_AHMEDABAD = '/api/image-slot/city-ahmedabad';
export const IMG_CITY_HYDERABAD = '/api/image-slot/city-hyderabad';
