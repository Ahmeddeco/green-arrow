import { getSession } from "@/auth/getSession"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import AddUserForm from "@/forms/AddUserForm"
import { CircleChevronLeft } from "lucide-react"

export default async function AddUsersPage() {
	await isAllowedRoles(["admin", "client"])
	const session = await getSession()
	const authUser = session?.user

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"أضف مستخدم جديد"}
			description={"أضف مستخدم جديد الى قاعدة البيانات."}
			btnTitle={"الرجوع"}
			href="/server/users"
		>
			<AddUserForm authUser={authUser} />
		</ServerPageCard>
	)
}
