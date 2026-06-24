import CategorySchema from "@/generated/zod/inputTypeSchemas/CategorySchema"
import ProductUnitSchema from "@/generated/zod/inputTypeSchemas/ProductUnitSchema"
import { z } from 'zod'
import ProductComponentSchema from "./ProductComponentSchema"

export const ProductSchema = z.object({
  unit: ProductUnitSchema,
  category: CategorySchema,
  id: z.string().nullish(),
  title: z.string(),
  description: z.string().nullish(),
  productUrl: z.string().nullish(),
  stock: z.number(),
  size: z.number(),
  price: z.number(),
  discountPercentage: z.number().nullish(),
  mainImage: z.string(),
  images: z.string().array(),
  recommendations: z.string().nullish(),
  features: z.string().nullish(),
  phi: z.string().nullish(),
  factoryId: z.string(),
  activeComponents: z.array(ProductComponentSchema).min(1),
})

export type Product = z.infer<typeof ProductSchema>

export default ProductSchema
