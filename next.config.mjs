/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Enable source maps in production for better error tracking
  productionBrowserSourceMaps: true,
  // Enable instrumentation for process-level error handlers
  experimental: {
    instrumentationHook: true,
  },
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
    ],
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
