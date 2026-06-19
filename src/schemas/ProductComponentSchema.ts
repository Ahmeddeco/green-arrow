import UnitSchema from "@/generated/zod/inputTypeSchemas/UnitSchema"
import { z } from 'zod'

export const ProductComponentSchema = z.object({
  unit: UnitSchema,
  productId: z.string(),
  componentId: z.string(),
  concentration: z.number().nullish(),
})

export type ProductComponent = z.infer<typeof ProductComponentSchema>

export default ProductComponentSchema
