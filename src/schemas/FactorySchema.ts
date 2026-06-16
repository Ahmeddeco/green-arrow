import { z } from 'zod'

export const FactorySchema = z.object({
  id: z.string().nullish(),
  name: z.string(),
  address: z.string().nullish(),
  tel: z.string(),
  email: z.string().nullish(),
  website: z.string().nullish(),
  logo: z.string().nullish(),
  userId: z.string(),
})

export type Factory = z.infer<typeof FactorySchema>

export default FactorySchema
