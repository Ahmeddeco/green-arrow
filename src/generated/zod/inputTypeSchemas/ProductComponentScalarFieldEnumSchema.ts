import { z } from 'zod';

export const ProductComponentScalarFieldEnumSchema = z.enum(['productId','componentId','concentration','unit']);

export default ProductComponentScalarFieldEnumSchema;
