const router = require('express').Router();
const usersRoutes = require('./users')

router.get('/', (req, res) => res.send('Hello world!'))

router.use('/users', usersRoutes)

module.exports = router;

