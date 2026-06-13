import { getSession } from "@/auth/getSession"
import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import AddUserForm from "@/forms/AddUserForm"
import { CircleChevronLeft } from "lucide-react"

export default async function AddUsersPage() {
	await isAllowedRoles(["admin","client"])
	const session = await getSession()
	const userId = session?.user.id

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"أضف عميل جديد"}
			description={"أضف عميل جديد الى قاعدة البيانات."}
			btnTitle={"الرجوع"}
			href="/server/clients"
		>
			<AddUserForm userId={userId} />
		</ServerPageCard>
	)
}
