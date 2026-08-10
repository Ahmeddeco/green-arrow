import { z } from 'zod';

/////////////////////////////////////////
// FACTORY SCHEMA
/////////////////////////////////////////

export const FactorySchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string().nullish(),
  tel: z.string(),
  email: z.string().nullish(),
  website: z.string().nullish(),
  logo: z.string().nullish(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Factory = z.infer<typeof FactorySchema>

export default FactorySchema;
