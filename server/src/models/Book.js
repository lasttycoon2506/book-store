const dynamoose = require("dynamoose");

const bookSchema = new dynamoose.Schema({
    "id": String, 
    "title": String,
    "author": String,
    "genre": String,
    "price": String,
}, {
    "timestamps": true
})

const Book = dynamoose.model("Book", bookSchema)

module.exports = Book