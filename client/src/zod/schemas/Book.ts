import { z } from 'zod'

export const BookSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string(),
    author: z.string(),
    pages: z.number().int().nonnegative(),
    genre: z.string(),
    price: z.number().nonnegative(),
    stock: z.number().int().nonnegative(),
}).required()
