import RoleSchema from "@/generated/zod/inputTypeSchemas/RoleSchema"
import { z } from 'zod'

export const UserSchema = z.object({
  role: RoleSchema.nullish(),
  id: z.string().nullish(),
  name: z.string(),
  email: z.string(),
  image: z.string().nullish(),
  mainMobile: z.string().nullish(),
  secondaryMobile: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  country: z.string().nullish(),
  lng: z.number().nullish(),
  lat: z.number().nullish(),
  addressDescription: z.string().nullish(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema
