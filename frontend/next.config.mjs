/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ocakes.in',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS domains (use cautiously)
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;
