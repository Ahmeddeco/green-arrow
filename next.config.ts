import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "hbync6i6cp.ufs.sh" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "picsum.photos" },
    ]
  },
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true
  },
}

export default nextConfig
