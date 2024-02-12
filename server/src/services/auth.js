import bcrypt from "bcryptjs"
import {v4 as uuidv4} from "uuid"

export const pwGenerator = async (event) => {
    try {
        const uuid = uuidv4()
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(newCustomer.password, salt)

    } catch (err) {
        console.log(err)
        throw new Error(err)
    }

    return registeredCustomer
}