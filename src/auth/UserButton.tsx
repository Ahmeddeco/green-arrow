import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { getSession } from "./getSession"
import SignOut from "./signOut"
import SignIn from "./SignIn"

export default async function UserButton() {
	const Session = await getSession()
	const user = Session?.user

	return (
		<>
			{user ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<div className="size-8 relative rounded-full">
							<Image src={user.image ?? "/icons/noImage.svg"} alt={"user"} fill className="rounded-full object-cover" />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" sideOffset={8} className="w-fit max-w-2xl">
						<DropdownMenuLabel>
							<div className="w-full aspect-square relative rounded-xl">
								<Image src={user.image ?? "/icons/noImage.svg"} alt={"user"} fill className="rounded-xl object-cover" />
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<h4>{user.name}</h4>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<p>{user.email}</p>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<SignOut />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<SignIn />
			)}
		</>
	)
}
