import ComponentUnitSchema from "@/generated/zod/inputTypeSchemas/ComponentUnitSchema"
import { z } from 'zod'

export const ProductComponentSchema = z.object({
  unit: ComponentUnitSchema,
  productId: z.string().nullish(),
  componentId: z.string(),
  concentration: z.number().positive().nullish(),
})

export type ProductComponent = z.infer<typeof ProductComponentSchema>

export default ProductComponentSchema
