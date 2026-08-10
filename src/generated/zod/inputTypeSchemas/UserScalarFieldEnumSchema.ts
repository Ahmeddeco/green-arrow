import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','createdAt','updatedAt','role','banned','banReason','banExpires','mainMobile','secondaryMobile','city','state','country','lng','lat','addressDescription']);

export default UserScalarFieldEnumSchema;
