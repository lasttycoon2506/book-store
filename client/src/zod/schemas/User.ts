import { z } from "zod";

export const UserSchema = z.object({
    userName: z.string().min(1, { message: 'Missing username' }),
    password: z.string().min(8, { message: 'Password must be at least 8 chars. long' }),
    name: z.string().min(1, { message: 'Missing name' }),
    email: z.string().min(1, { message: 'Missing email' }),
    phone: z.string().min(1, { message: 'Missing phone' })
})
