import CategorySchema from "@/generated/zod/inputTypeSchemas/CategorySchema"
import { z } from 'zod'

export const ProductSchema = z.object({
  category: CategorySchema,
  id: z.string().nullish(),
  title: z.string(),
  description: z.string().nullish(),
  productUrl: z.string().nullish(),
  stock: z.number(),
  price: z.number(),
  discountPercentage: z.number(),
  mainImage: z.string(),
  images: z.string().array(),
  factoryId: z.string(),
})

export type Product = z.infer<typeof ProductSchema>

export default ProductSchema
