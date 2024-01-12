const express = require('express')
const app = express()

const dotenv = require('dotenv');
dotenv.config();
const config = require('../env').get(process.env.NODE_ENV);

const morgan = require("morgan")
app.use(morgan('dev'))

app.use(express.json())

const dynamoose = require("dynamoose")
dynamoose.aws.sdk.config.update({
    "accessKeyId": config.awsAccessKeyId,
    "secretAccessKey": config.awsSecretKey,
    "region": "us-east-2",
});

app.use(require("./routes"))

module.exports = app;