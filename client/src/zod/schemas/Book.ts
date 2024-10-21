import { z } from 'zod'

export const BookSchema = z
    .object({
        id: z.string().uuid().optional(),
        title: z.string(),
        author: z.string(),
        pages: z.coerce
            .number({
                required_error: 'Pages is required',
                invalid_type_error: 'Pages must be an integer > 0',
            })
            .int()
            .positive(),
        genre: z.string(),
        price: z.coerce
            .number({
                required_error: 'Price is required',
                invalid_type_error: 'Price must be a number > 0',
            })
            .nonnegative(),
        stock: z.coerce
            .number({
                required_error: 'Stock is required',
                invalid_type_error: 'Stock must be an integer >= 0',
            })
            .int()
            .nonnegative(),
    })
    .required()
