const router = require('express').Router();
const usersRoutes = require('./books')

router.get('/', (req, res) => res.send('Hello world!'))

router.use('/users', usersRoutes)

module.exports = router;

