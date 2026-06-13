import { isAllowedRoles } from "@/auth/isAllowedRoles"

export default async function ServerPage() {
	await isAllowedRoles(["admin"])

	return <h1>Welcome to Serverpage!</h1>
}
