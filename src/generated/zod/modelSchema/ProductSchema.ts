import { z } from 'zod';
import { ProductUnitSchema } from '../inputTypeSchemas/ProductUnitSchema'
import { CategorySchema } from '../inputTypeSchemas/CategorySchema'

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  unit: ProductUnitSchema,
  category: CategorySchema,
  id: z.string(),
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
  createdAt: z.date(),
  updatedAt: z.date(),
  factoryId: z.string(),
})

export type Product = z.infer<typeof ProductSchema>

export default ProductSchema;
