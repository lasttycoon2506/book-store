import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export async function updateBook(event: APIGatewayEvent, dbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const docClient = DynamoDBDocumentClient.from(dbClient);
    const parsedBody = JSON.parse(event.body);

    const response = docClient.send(new UpdateCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
            id: context.queryStringParameters["id"]
        },
        UpdateExpression: 'set #zzzNew = :new',
        ExpressionAttributeValues: {
            ':new': {
                S: requestBodyValue
            }
        },
        ExpressionAttributeNames: {
            '#zzzNew': requestBodyKey
        },
        ReturnValues: 'UPDATED_NEW'
    }))
}