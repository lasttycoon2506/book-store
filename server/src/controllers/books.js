const router = require("express").Router()


exports.register = async function(req, res) {
    const newUserInput = req.body


    res.json(newUserInput)
}

module.exports = createBook;