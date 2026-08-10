import { z } from 'zod';

export const ComponentScalarFieldEnumSchema = z.enum(['id','title','unit','createdAt','updatedAt']);

export default ComponentScalarFieldEnumSchema;
