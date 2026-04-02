const nextConfig = {
  output: 'standalone',
  images: {
    // Hostinger Node runtime may not have native sharp binaries available.
    // Disable built-in optimization to avoid runtime sharp errors.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24 hours — cache optimized images at edge
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },

  webpack(config, { dev }) {
    if (dev) {
      // Reduce CPU/memory from file watching
      config.watchOptions = {
        poll: 2000, // check every 2 seconds
        aggregateTimeout: 300, // wait before rebuilding
        ignored: ['**/node_modules'],
      };
    }
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 10000,
    pagesBufferLength: 2,
  },
  async headers() {
    const allowedOrigins = process.env.CORS_ORIGINS || '';
    const corsOrigin = allowedOrigins || process.env.NEXT_PUBLIC_BASE_URL || 'https://rajasthantourandpackages.com';
    return [
      {
        // API routes — allow configured CORS origins
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: corsOrigin },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
      {
        // All pages — standard security headers
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://www.google.com https://*.supabase.co;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
