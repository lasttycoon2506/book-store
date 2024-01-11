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

const User = dynamoose.model("User", userSchema)

module.exports = User