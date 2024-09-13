import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Key } from "aws-cdk-lib/aws-kms";

export async function getBook(event: APIGatewayProxyEvent, dbclient: DynamoDBClient) {
    const bookId = event.queryStringParameters['id']

    const docClient = DynamoDBDocumentClient.from(dbclient)
    
    const book = await docClient.send(new GetCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
            id: bookId
    }}))
    
    
}