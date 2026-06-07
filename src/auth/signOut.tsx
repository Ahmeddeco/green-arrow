"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { signOut } from "@/lib/auth-client"

export default function SignOut() {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	const handleSignOut = () => {
		startTransition(async () => {
			await signOut()
			router.refresh()
		})
	}

	return (
		<Button onClick={handleSignOut} disabled={isPending} variant={"destructive"} size={"full"} className="w-full">
			{isPending ? "Signing out..." : "SignOut"}
		</Button>
	)
}
