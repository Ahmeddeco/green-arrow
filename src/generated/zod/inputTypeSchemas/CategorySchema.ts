import { z } from 'zod';

export const CategorySchema = z.enum(['herbicides','insecticides','fungicides','acaricides','nematicides','growth_regulators','fertilizers','seeds','tools']);

export type CategoryType = `${z.infer<typeof CategorySchema>}`

export default CategorySchema;
