import { z } from 'zod';

export const OrderScalarFieldEnumSchema = z.enum(['id','userId','totalAmount','status','address','createdAt','updatedAt']);

export default OrderScalarFieldEnumSchema;
