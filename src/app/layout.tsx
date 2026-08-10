import type { Metadata, Viewport } from "next"
import "./globals.css"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import { TooltipProvider } from "@/components/ui/tooltip"

const cairo = localFont({
	src: "../../public/fonts/Cairo.ttf",
})

/* -------------------------------- APP_INFO -------------------------------- */
const APP_NAME = "Green Arrow"
const APP_DEFAULT_TITLE = "Green Arrow"
const APP_TITLE_TEMPLATE = "%s - Green Arrow"
const APP_DESCRIPTION = "Agriculture Services | Pesticides and Fertilizers Trade"
const baseUrl = process.env.NEXT_PUBLIC_APP_URL
	? process.env.NEXT_PUBLIC_APP_URL
	: process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: "https://green-arrow-eg.vercel.app/"

/* -------------------------------- Metadata -------------------------------- */
export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),

	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: APP_NAME,
	},
	formatDetection: {
		telephone: false,
	},
	icons: {
		icon: [
			{ url: "/icons/manifest-icon-192.maskable.png", sizes: "192x192", type: "image/png" },
			{ url: "/icons/manifest-icon-512.maskable.png", sizes: "512x512", type: "image/png" },
		],
		apple: [{ url: "/icons/apple-icon-180.png", sizes: "180x180", type: "image/png" }],
	},
	openGraph: {
		type: "website",
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
	twitter: {
		card: "summary",
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
}

/* -------------------------------- Viewport -------------------------------- */
export const viewport: Viewport = {
	themeColor: "#facc15",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ar" dir="rtl" suppressHydrationWarning>
			<body className={`${cairo.className} antialiased`} suppressHydrationWarning>
				<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<TooltipProvider>{children}</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
