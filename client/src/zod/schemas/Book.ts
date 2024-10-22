import { z } from 'zod'

export const BookSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string().min(1, { message: 'Missing title' }),
    author: z.string().min(1, { message: 'Missing author' }),
    pages: z.coerce
        .number({
            required_error: 'Pages is required',
            invalid_type_error: 'Pages must be an integer > 0',
        })
        .int()
        .positive()
        .gte(1, { message: 'Missing pages' }),
    genre: z.string().min(1, { message: 'Missing genre' }),
    price: z.coerce
        .number({
            required_error: 'Price is required',
            invalid_type_error: 'Price must be a number > 0',
        })
        .positive()
        .gte(1, { message: 'Missing price' })
        ,

    stock: z.coerce
        .number({
            required_error: 'Stock is required',
            invalid_type_error: 'Stock must be an integer >= 0',
        })
        .int()
        .nonnegative()
        .gte(1, { message: 'Missing stock' }),
})
// z.number()
//   .refine(x => x * 100 - Math.trunc(x * 100)< Number.EPSILON)
//   .parse(0.1 + 0.1  + 0.1)
