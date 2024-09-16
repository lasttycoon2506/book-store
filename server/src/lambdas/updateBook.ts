import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";


export async function updateBook(event: APIGatewayEvent, dbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const parsedBody = JSON.parse(event.body);
    const requestBodyKey = Object.keys(parsedBody)[1];
    const requestBodyValue = parsedBody[requestBodyKey];


    const response = await dbClient.send(new UpdateItemCommand({
        Key: {
            id: marshall(event.queryStringParameters["id"])
        },
        ExpressionAttributeNames: {
            "#T": requestBodyKey,
            "#P": requestBodyKey
        },
        ExpressionAttributeValues: {
            ':t': marshall(requestBodyValue)
            ,
            ':p': marshall(requestBodyValue)
        
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