import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllUsersForFactoryPage } from "@/dl/users.data"
import AddFactoryForm from "@/forms/AddFactoryForm"
import { CircleChevronLeft } from "lucide-react"

export default async function AddFactoriesPage() {
	await isAllowedRoles(["admin"])
	const allUsers = await getAllUsersForFactoryPage()

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"أضف مصنع جديد"}
			description={"أضف مصنع جديد الى قاعدة البيانات."}
			btnTitle={"الرجوع"}
			href="/server/factories"
		>
			<AddFactoryForm allUsers={allUsers} />
		</ServerPageCard>
	)
}
