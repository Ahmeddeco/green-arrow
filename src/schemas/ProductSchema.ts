import CategorySchema from "@/generated/zod/inputTypeSchemas/CategorySchema"
import { z } from 'zod'
import ProductComponentSchema from "./ProductComponentSchema"

export const ProductSchema = z.object({
  category: CategorySchema,
  id: z.string().nullish(),
  title: z.string(),
  description: z.string().nullish(),
  recommendations: z.string().nullish(),
  features: z.string().nullish(),
  phi: z.number().positive(),
  factoryId: z.string(),
  activeComponents: z.array(ProductComponentSchema).min(1),
  productUrl: z.string().nullish(),
  price: z.number().positive(),
  stock: z.number().positive(),
  discountPercentage: z.number().max(99).positive().nullish(),
  mainImage: z.string(),
  images: z.string().array(),
})

export type Product = z.infer<typeof ProductSchema>

export default ProductSchema
