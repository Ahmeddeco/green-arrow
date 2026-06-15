import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "hbync6i6cp.ufs.sh" },
    ]
  },
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true
  },
}

export default nextConfig
