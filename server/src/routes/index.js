const router = require('express').Router();
const booksRoutes = require('./books')

router.get('/', (req, res) => res.send('Hello world!'))

router.use('/books', booksRoutes)

module.exports = router;