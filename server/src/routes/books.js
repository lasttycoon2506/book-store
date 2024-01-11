const router = require("express").Router()
const newBook = require("../controllers/books")

router.post('/register', newBook.register)

module.exports = router;