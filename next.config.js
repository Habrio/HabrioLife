/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable default SSR/ISR rendering. Static export is disabled to allow
  // dynamic pages like /posts with search params.
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
};

module.exports = nextConfig;
