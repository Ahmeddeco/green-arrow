import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllComponents } from "@/dl/components.data"
import { getAllFactoriesForProductPage } from "@/dl/factories.data"
import AddProductForm from "@/forms/AddProductForm"
import { getAllComponentsType } from "@/types/components.type"
import { getAllFactoriesForProductPageType } from "@/types/factories.type"
import { CircleChevronLeft } from "lucide-react"

export default async function AddFactoriesPage() {
	await isAllowedRoles(["admin"])
	const allFactories: getAllFactoriesForProductPageType = await getAllFactoriesForProductPage()
	const allComponents: getAllComponentsType = await getAllComponents()

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"أضف منتج جديد"}
			description={"أضف منتج جديد الى قاعدة البيانات."}
			btnTitle={"الرجوع"}
			href="/server/products"
		>
			<AddProductForm allFactories={allFactories} allComponents={allComponents} />
		</ServerPageCard>
	)
}
