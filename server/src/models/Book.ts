import { z } from 'zod'

export const Book = z.object({
    id: z.string().uuid().optional(),
    title: z.string().min(1),
    author: z.string().min(1),
    pages: z.number().int().positive(),
    genre: z.string().min(1),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
})
