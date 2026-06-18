import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getOneComponent } from "@/dl/components.data"
import EditComponentForm from "@/forms/EditComponentForm"
import { CircleChevronLeft } from "lucide-react"

export default async function EditFactoriesPage({ params }: { params: Promise<{ id: string }> }) {
	await isAllowedRoles(["admin"])
	const id = (await params).id
	const oneComponent = await getOneComponent(id)

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"عدل بيانات المادة الفعالة"}
			description={"عدل المادة الفعالة الموجودة في قاعدة البيانات."}
			btnTitle={"الرجوع"}
			href="/server/components"
		>
			<EditComponentForm oneComponent={oneComponent!} />
		</ServerPageCard>
	)
}
