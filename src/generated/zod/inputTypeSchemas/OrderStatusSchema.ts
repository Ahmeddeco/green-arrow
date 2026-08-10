import { z } from 'zod';

export const OrderStatusSchema = z.enum(['pending','processing','shipped','delivered','cancelled']);

export type OrderStatusType = `${z.infer<typeof OrderStatusSchema>}`

export default OrderStatusSchema;
