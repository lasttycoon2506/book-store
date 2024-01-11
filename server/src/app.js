const express = require('express')
const morgan = require("morgan")

const app = express()

app.use(express.json())
const dynamoose = require("dynamoose")
dynamoose.aws.sdk.config.update({"region": "us-east-2"});
app.use(morgan('dev'))
app.use(require("./routes"))


module.exports = app;