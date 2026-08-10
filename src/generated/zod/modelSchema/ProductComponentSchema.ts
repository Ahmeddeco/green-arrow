import { z } from 'zod';
import { ComponentUnitSchema } from '../inputTypeSchemas/ComponentUnitSchema'

/////////////////////////////////////////
// PRODUCT COMPONENT SCHEMA
/////////////////////////////////////////

export const ProductComponentSchema = z.object({
  unit: ComponentUnitSchema,
  productId: z.string(),
  componentId: z.string(),
  concentration: z.number().nullish(),
})

export type ProductComponent = z.infer<typeof ProductComponentSchema>

export default ProductComponentSchema;
