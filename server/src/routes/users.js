const router = require("express").Router()
const customer = require("../controllers/users")

router.post('/register', customer.register)

module.exports = router;