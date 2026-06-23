import ComponentUnitSchema from "@/generated/zod/inputTypeSchemas/ComponentUnitSchema"
import { z } from 'zod'

export const ComponentSchema = z.object({
  id: z.string().nullish(),
  title: z.string(),
  unit: ComponentUnitSchema,
})

export type Component = z.infer<typeof ComponentSchema>

export default ComponentSchema
