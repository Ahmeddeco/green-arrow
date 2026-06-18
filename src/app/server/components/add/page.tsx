import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import AddComponentForm from "@/forms/AddComponentForm"
import { CircleChevronLeft } from "lucide-react"

export default async function AddComponentsPage() {
	await isAllowedRoles(["admin"])

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"أضف منتج جديد"}
			description={"أضف منتج جديد الى قاعدة البيانات."}
			btnTitle={"الرجوع"}
			href="/server/components"
		>
			<AddComponentForm />
		</ServerPageCard>
	)
}
