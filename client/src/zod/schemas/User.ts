import { z } from 'zod'

const pwRegex =
    /^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/

export const UserSchema = z.object({
    userName: z.string().min(1, { message: 'Missing username' }),
    password: z
        .string()
        .min(8, { message: 'PW must be at least 8 chars. long' })
        .regex(pwRegex, {
            message:
                'PW must: - be at least 8 chars long - one Uppercase letter \n -one Lowercase letter \n -one Number \n -one Special Character',
        }),
    name: z.string().min(1, { message: 'Missing name' }),
    email: z.string().min(1, { message: 'Missing email' }).email({message: 'Invalid email'}),
    phone: z.string().min(1, { message: 'Missing phone' }).length(10, {message: "Phone must be 10 digits"}),
})
