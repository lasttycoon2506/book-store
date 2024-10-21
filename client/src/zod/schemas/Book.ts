import { z } from 'zod'

export const BookSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string(),
    author: z.string(),
    pages: z.coerce.number().int().nonnegative(),
    genre: z.string(),
    price: z.coerce.number().nonnegative(),
    stock: z.coerce.number().int().nonnegative(),
}).required()
