import { z } from 'zod';

export const ComponentUnitSchema = z.enum(['g_liter','percentage','g_kg','ppm','ppb']);

export type ComponentUnitType = `${z.infer<typeof ComponentUnitSchema>}`

export default ComponentUnitSchema;
