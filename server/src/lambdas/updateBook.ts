import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";


export async function updateBook(event: APIGatewayEvent, dbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const docClient = DynamoDBDocumentClient.from(dbClient);
    const parsedBody = JSON.parse(event.body);
    const requestBodyKey = Object.keys(parsedBody)[1];
    const requestBodyValue = parsedBody[requestBodyKey];


    const response = await docClient.send(new UpdateCommand({
        Key: {
            id: event.queryStringParameters["id"]
        },
        ExpressionAttributeNames: {
            "#T": requestBodyKey,
            "#P": requestBodyKey
        },
        ExpressionAttributeValues: {
            ':t': {
                S: requestBodyValue
            },
            ':p': {
                N: requestBodyValue
            }
        },
        TableName: process.env.TABLE_NAME,
        UpdateExpression: 'SET #T = :t, #P = :p',
        ReturnValues: 'ALL_NEW'
    }))
    return {
        statusCode: 201,
        body: JSON.stringify(response)
    }
}