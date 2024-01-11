const authService = require('../services/auth')


exports.register = async function(req, res) {
    try {
        const {
            username,
            password,
            email,
            firstName,
            lastName,
            phone,
            address,
            city,
            state,
            zip,
        } = req.body
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred while registering." });
    }

    var newUser
    try {
        newUser = await authService.registerUser(newUserInput)
    } catch (err) {
        console.log(err)
        if(err.message == "EXISTING_USER_ERROR") {
            return res.status("422").json({"message":"User already exists"})
        }
        throw new Error(err)
    }

    res.json(newUser)
}

