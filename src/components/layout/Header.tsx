import { auth } from "@/lib/auth"
import { ThemeButton } from "../theme/ThemeButton"
import FrontNavigation from "./FrontNavigation"
import Logo from "./Logo"
import MobileMenu from "./MobileMenu"
import Cart from "@/store/Cart"
import { headers } from "next/headers"
import UserButton from "@/auth/UserButton"

export default async function Header() {
	const session = await auth.api.getSession({ headers: await headers() })
	const user = session?.user

	return (
		<header className="fixed inset-0 w-full flex items-center justify-between h-12 lg:h-14 bg-input/30 text-foreground backdrop-blur-md px-4 lg:px-16 z-50 shadow-md ">
			<Logo />
			<nav className="hidden lg:flex items-center gap-6">
				<FrontNavigation />
			</nav>
			<div className="hidden lg:flex items-center gap-4">
				{user && <Cart />}
				<ThemeButton />
				<UserButton />
			</div>
			<div className="lg:hidden block">
				<MobileMenu />
			</div>
		</header>
	)
}
