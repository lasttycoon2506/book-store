const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({
  
});

// region: 'us-east-1',
  // endpoint: 'http://0.0.0.0:8000',
  // accessKeyId: 'MockAccessKeyId',
  // secretAccessKey: 'MockSecretAccessKey',

module.exports = client;