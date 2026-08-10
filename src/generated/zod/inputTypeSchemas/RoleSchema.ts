import { z } from 'zod';

export const RoleSchema = z.enum(['user','admin','seller','client','provider']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export default RoleSchema;
