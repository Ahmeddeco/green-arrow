import { z } from 'zod';

export const FactoryScalarFieldEnumSchema = z.enum(['id','name','address','tel','email','website','logo','userId','createdAt','updatedAt']);

export default FactoryScalarFieldEnumSchema;
