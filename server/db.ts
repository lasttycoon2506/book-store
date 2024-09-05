import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const client = new DynamoDBClient({
  region: 'us-east-1',
  endpoint: 'http://0.0.0.0:8000'
});

