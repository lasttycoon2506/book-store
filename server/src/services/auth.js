const User = require("../models/User")
const bcrypt = require("bcryptjs")
const {v4: uuidv4} = require("uuid")

exports.registerUser = async function(newUser) {
    try {
        existingUser = await User.scan({username: {eq: newUser.username}}).exec()
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
    if(existingUser.count > 0) {
        throw new Error("EXISTING_USER_ERROR")
    } 

    try {
        const uuid = uuidv4()
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(newUser.password, salt)
        registeredUser = await User.create({
            "id": uuid,
            "username": newUser.username,
            "password": hashedPass,
            "firstName": newUser.firstName,
            "lastName": newUser.lastName,
            "email": newUser.email,
            "address": newUser.address,
            "city": newUser.city,
            "state": newUser.state,
            "zip": newUser.zip,
        })
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }

    return registeredUser
}