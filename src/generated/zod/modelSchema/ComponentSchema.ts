import { z } from 'zod';
import { ComponentUnitSchema } from '../inputTypeSchemas/ComponentUnitSchema'

/////////////////////////////////////////
// COMPONENT SCHEMA
/////////////////////////////////////////

export const ComponentSchema = z.object({
  unit: ComponentUnitSchema,
  id: z.string(),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Component = z.infer<typeof ComponentSchema>

export default ComponentSchema;
