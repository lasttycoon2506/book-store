import bcrypt from "bcryptjs"
import {v4 as uuidv4} from "uuid"

exports.registerCustomer = async function(newCustomer) {
    try {
        const uuid = uuidv4()
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(newCustomer.password, salt)

        //to-do customer model gen...
        registeredCustomer = await Customer.create({
            "id": uuid,
            "username": newCustomer.Customername,
            "password": hashedPass,
            "firstName": newCustomer.firstName,
            "lastName": newCustomer.lastName,
            "email": newCustomer.email,
            "address": newCustomer.address,
            "city": newCustomer.city,
            "state": newCustomer.state,
            "zip": newCustomer.zip,
        })
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }

    return registeredCustomer
}