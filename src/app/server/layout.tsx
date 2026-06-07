import Footer from "@/components/layout/Footer"
import { ServerSidebar } from "@/components/layout/ServerSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function ServerLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<ServerSidebar />
			<div className="w-full  ">
				<SidebarTrigger />
				<div className="p-6 min-h-[80vh]">{children}</div>
				<Footer />
			</div>
		</SidebarProvider>
	)
}
