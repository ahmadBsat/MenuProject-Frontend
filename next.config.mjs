/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

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
