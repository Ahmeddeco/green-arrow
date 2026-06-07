import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import Form from "next/form"
import { redirect } from "next/navigation"
import { FaGoogle } from "react-icons/fa6"

export default async function SignIn() {
	const signIn = async () => {
		"use server"
		const { redirect: shouldRedirect, url } = await auth.api.signInSocial({
			body: {
				provider: "google",
			},
		})
		if (shouldRedirect && url) {
			redirect(url)
		}
	}

	return (
		<Form action={signIn}>
			<Button type="submit" size={"sm"}>
				Sign In
				<FaGoogle />
			</Button>
		</Form>
	)
}
