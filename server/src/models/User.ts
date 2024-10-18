import { z } from 'zod'

const User = z.object({
    userName: z.string(),
    password: z.string(),
    name: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
})

// User.parse({ username: 'Ludwig' })

// extract the inferred type
export type User = z.infer<typeof User>

// { username: string }
