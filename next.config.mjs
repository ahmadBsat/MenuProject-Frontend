/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
