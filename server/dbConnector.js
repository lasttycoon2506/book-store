const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({
    region: 'localhost',
  endpoint: 'http://0.0.0.0:8000',
  accessKeyId: 'MockAccessKeyId',
  secretAccessKey: 'MockSecretAccessKey',
});

module.exports = client;