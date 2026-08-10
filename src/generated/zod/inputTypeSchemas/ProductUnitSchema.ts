import { z } from 'zod';

export const ProductUnitSchema = z.enum(['liter','cm','gm','kg','piece','seed']);

export type ProductUnitType = `${z.infer<typeof ProductUnitSchema>}`

export default ProductUnitSchema;
