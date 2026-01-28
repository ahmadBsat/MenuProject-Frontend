/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  // Standalone output for optimized Docker deployments
  output: "standalone",

  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shopppers.s3.eu-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "fmcstore.fsn1.your-objectstorage.com",
      },
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "nominatim.openstreetmap.org",
      },
      {
        protocol: "https",
        hostname: "maps.google.com",
      },
    ],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    formats: ['image/webp'],
    // Retry failed image loads
    loader: 'default',
  },

  // Increase timeout for external resources
  experimental: {
    proxyTimeout: 30000, // 30 seconds
  },

  // Logging configuration for better debugging in production
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Error handling
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  // Generate stable build ID using Coolify's SOURCE_COMMIT for version tracking
  generateBuildId: async () => {
    // Use SOURCE_COMMIT from Coolify, fallback to BUILD_ID or timestamp
    return process.env.SOURCE_COMMIT || process.env.BUILD_ID || `build-${Date.now()}`;
  },

  // Headers to control caching and force refresh on deployment
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/login",
        destination: "/",
        permanent: true,
      },
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
