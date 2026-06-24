import { getAllProductWithCategoryForProductCard } from "@/dl/products.data"
import { Category } from "@/generated/prisma/enums"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProductCard from "@/components/shared/ProductCard"
import { getAllProductWithCategoryForProductCardType } from "@/types/Product.type"
import { Badge } from "@/components/ui/badge"

export default async function ProductPage({
	searchParams,
}: {
	searchParams: Promise<{ page: string; size: string; category: string }>
}) {
	const params = await searchParams
	const pageNumber = params.page && +params.page > 1 ? +params.page : 1
	const pageSize = params.size && +params.size > 0 ? +params.size : 9
	const rawCategory = params.category
	const category = Object.values(Category).includes(rawCategory as Category) ? (rawCategory as Category) : undefined
	const categoryQuery = category ? `&category=${category}` : ""
	const products: getAllProductWithCategoryForProductCardType = await getAllProductWithCategoryForProductCard(
		pageSize,
		pageNumber,
		category,
	)

	return (
		<section className="container mx-auto space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>{category}</CardTitle>
					<CardDescription>
						<Badge>
							إجمالي عدد المنتجات <span className="font-bold">{products?.totalProducts}</span>
						</Badge>
					</CardDescription>
				</CardHeader>
				<CardContent className="grid lg:grid-cols-3 grid-cols-2 gap-8">
					{products?.data.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</CardContent>
			</Card>
			{/* ---------------------------- Pagination ---------------------------- */}
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						{/* --------------------------- Previous --------------------------- */}
						{pageNumber > 1 && (
							<PaginationPrevious href={`?size=${pageSize}&page=${pageNumber - 1}&${categoryQuery}`} />
						)}
					</PaginationItem>

					{/* ------------------------- PaginationLink ------------------------ */}
					{Array.from({ length: products!.totalPages }).map((_, index) => {
						const targetPage = index + 1
						return (
							<PaginationItem key={index}>
								<PaginationLink
									href={`?size=${pageSize}&page=${targetPage}${categoryQuery}`}
									isActive={pageNumber === targetPage}
								>
									{targetPage}
								</PaginationLink>
							</PaginationItem>
						)
					})}
					<PaginationItem>
						{/* ----------------------------- Next ----------------------------- */}
						{pageNumber < 1 && <PaginationNext href={`?size=${pageSize}&page=${pageNumber + 1}&${categoryQuery}`} />}
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</section>
	)
}
