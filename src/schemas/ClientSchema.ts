import RoleSchema from "@/generated/zod/inputTypeSchemas/RoleSchema"
import { z } from 'zod'

export const ClientSchema = z.object({
  role: RoleSchema,
  id: z.string().nullish(),
  mainMobile: z.string(),
  secondaryMobile: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  country: z.string().nullish(),
  lng: z.string().nullish(),
  lat: z.string().nullish(),
  addressDescription: z.string().nullish(),
  userId: z.string(),
})

export type Client = z.infer<typeof ClientSchema>

export default ClientSchema
