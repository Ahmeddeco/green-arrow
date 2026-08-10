import withPWAInit from "@ducanh2912/next-pwa"


const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  dynamicStartUrl: true,
  reloadOnOnline: true,
})

export default withPWA({
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
  turbopack: {},
  serverExternalPackages: ["@mastra/*"],
})