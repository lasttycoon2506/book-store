const router = require('express').Router();
const authRoutes = require('./Auth.routes')

router.get('/', (req, res) => res.send('Hello world!'))

router.use('/api/auth', authRoutes)

module.exports = router;