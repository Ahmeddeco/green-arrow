import UnitSchema from "@/generated/zod/inputTypeSchemas/UnitSchema"
import { z } from 'zod'

export const ComponentSchema = z.object({
  id: z.string().nullish(),
  title: z.string(),
  unit: UnitSchema,
})

export type Component = z.infer<typeof ComponentSchema>

export default ComponentSchema
