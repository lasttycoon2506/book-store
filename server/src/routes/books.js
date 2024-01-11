const router = require("express").Router()
const book = require("../controllers/books")

router.post('/register', book.register)

module.exports = router;