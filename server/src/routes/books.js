const router = require("express").Router()
const book = require("../controllers/books")

router.post('/add', book.add)

module.exports = router;