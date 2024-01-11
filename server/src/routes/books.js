const router = require("express").Router()
const user = require("../controllers/users")

router.post('/register', user.register)

module.exports = router;