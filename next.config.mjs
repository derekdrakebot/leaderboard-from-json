/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: "/leaderboard-from-json",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig