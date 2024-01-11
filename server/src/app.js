const express = require('express')
const app = express()

const morgan = require("morgan")
app.use(morgan('dev'))

const dynamoose = require("dynamoose")
dynamoose.aws.sdk.config.update({
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
    "region": "us-east-1",
});

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json())
app.use(require("./routes"))


module.exports = app;