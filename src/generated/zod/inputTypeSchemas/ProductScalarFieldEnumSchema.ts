import { z } from 'zod';

export const ProductScalarFieldEnumSchema = z.enum(['id','title','description','productUrl','stock','size','unit','price','discountPercentage','mainImage','images','category','recommendations','features','phi','createdAt','updatedAt','factoryId']);

export default ProductScalarFieldEnumSchema;
