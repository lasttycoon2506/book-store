import { z } from 'zod'

export const User = z.object({
    userName: z.string().min(5),
    password: z.string().min(8),
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(10),
})
