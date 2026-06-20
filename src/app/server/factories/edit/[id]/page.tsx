import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getOneFactoryForEditFactoryPage } from "@/dl/factories.data"
import { getAllUsersForFactoryPage } from "@/dl/users.data"
import EditFactoryForm from "@/forms/EditFactoryForm"
import { CircleChevronLeft } from "lucide-react"

export default async function EditFactoriesPage({ params }: { params: Promise<{ id: string }> }) {
	await isAllowedRoles(["admin"])
	const allUsers = await getAllUsersForFactoryPage()
	const id = (await params).id
	const oneFactory = await getOneFactoryForEditFactoryPage(id)

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"عدل بيانات الصنع"}
			description={"أضف مصنع جديد الى قاعدة البيانات."}
			btnTitle={"الرجوع"}
			href="/server/factories"
		>
			<EditFactoryForm allUsers={allUsers} oneFactory={oneFactory} />
		</ServerPageCard>
	)
}
