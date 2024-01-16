const authentication = require('../services/auth')


exports.register = async function(req, res) {
    try {
        const newCustomer = req.body
        newCustomer = await authentication.registerCustomer(newUserInput)
    }
    catch (err) {
        res.status(500).json({ message: "An error occurred while registering." });
    }

    
    res.json(newCustomer)
}

