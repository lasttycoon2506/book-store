const router = require('express').Router();
const booksRoutes = require('./routes.books.js')

router.get('/', (req, res) => res.send('Hello world!'))

router.use('/api/auth', booksRoutes)

module.exports = router;