import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cloud.appwrite.io'], // Add other domains if necessary
  },
  typescript: {
    ignoreBuildErrors: true,
},
eslint: {
    ignoreDuringBuilds: true,
}
};

export default nextConfig;
