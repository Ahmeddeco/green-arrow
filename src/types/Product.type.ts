import { getAllProductsForServerProductsPage, getAllProductWithCategoryForProductCard, getOneProductForEditProductPage, getOneProductForProductDetailsPage, getProductsByCategoryForBot } from "@/dl/products.data"
import { Category, ProductUnit, } from "@/generated/prisma/enums"

/* ---------------------------- ProductCardType ---------------------------- */
export type ProductCardType = {

  id: string
  title: string
  description: string | null
  unit: ProductUnit
  price: number
  discountPercentage: number | null
  mainImage: string
  category: Category
  createdAt: Date
  activeComponents: {
    component: {
      title: string
    }
  }[]
  factory: {
    name: string
  }
}


export type getAllProductsForServerProductsPageType = Awaited<ReturnType<typeof getAllProductsForServerProductsPage>>
export type getOneProductForEditProductPageType = Awaited<ReturnType<typeof getOneProductForEditProductPage>>
export type getAllProductWithCategoryForProductCardType = Awaited<ReturnType<typeof getAllProductWithCategoryForProductCard>>
export type getOneProductForProductDetailsPageType = Awaited<ReturnType<typeof getOneProductForProductDetailsPage>>
export type getProductsByCategoryForBotType = Awaited<ReturnType<typeof getProductsByCategoryForBot>>