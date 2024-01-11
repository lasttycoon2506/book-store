const express = require('express')
const app = express()

const morgan = require("morgan")
app.use(morgan('dev'))

app.use(express.json())

const dotenv = require('dotenv');
dotenv.config();

const dynamoose = require("dynamoose")
dynamoose.aws.sdk.config.update({
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
    "region": "us-east-2",
});

app.use(require("./routes"))

module.exports = app;