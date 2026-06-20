import { isAllowedRoles } from "@/auth/isAllowedRoles"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { getAllComponents } from "@/dl/components.data"
import { getAllFactoriesForProductPage } from "@/dl/factories.data"
import { getOneProductForEditProductPage } from "@/dl/products.data"
import EditProductForm from "@/forms/EditProductForm"
import { getAllComponentsType } from "@/types/components.type"
import { getOneProductForEditProductPageType } from "@/types/Product.type"
import { CircleChevronLeft } from "lucide-react"

export default async function EditFactoriesPage({ params }: { params: Promise<{ id: string }> }) {
	await isAllowedRoles(["admin"])
	const id = (await params).id
	const allFactories = await getAllFactoriesForProductPage()
	const allComponents: getAllComponentsType = await getAllComponents()
	const oneProduct: getOneProductForEditProductPageType = await getOneProductForEditProductPage(id)

	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"عدل بيانات المنتج"}
			description={"عدل منتج موجود في قاعدة البيانات."}
			btnTitle={"الرجوع"}
			href="/server/products"
		>
			<EditProductForm allFactories={allFactories} allComponents={allComponents} oneProduct={oneProduct} />
		</ServerPageCard>
	)
}
