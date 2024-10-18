import { z } from 'zod'

export const User = z.object({
    userName: z.string(),
    password: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
})

// User.parse({ username: 'Ludwig' })

// extract the inferred type
// type User = z.infer<typeof User>

// { username: string }
