import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllFactoriesForProductPage } from "@/dl/factories.data"
import AddProductForm from "@/forms/AddProductForm"
import { CircleChevronLeft } from "lucide-react"

export default async function AddFactoriesPage() {
	await isAllowedRoles(["admin"])
	const allFactories = await getAllFactoriesForProductPage()

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"أضف منتج جديد"}
			description={"أضف منتج جديد الى قاعدة البيانات."}
			btnTitle={"الرجوع"}
			href="/server/products"
		>
			<AddProductForm allFactories={allFactories} />
		</ServerPageCard>
	)
}
