import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'cs2practice.com' }],
        destination: 'https://www.cs2practice.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
