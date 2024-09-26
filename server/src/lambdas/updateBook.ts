import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";


export async function updateBook(event: APIGatewayEvent, dbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const parsedBody = JSON.parse(event.body);
    const bodyKeys = Object.keys(parsedBody);
    const titleKey = bodyKeys[0];
    const titleValue = bodyKeys[0];
    const pagesKey = bodyKeys[1];
    const pagesValue = bodyKeys[1];

    try {
        const response = await dbClient.send(new UpdateItemCommand({
            Key: {
                id: marshall(event.queryStringParameters["id"])
            },
            ExpressionAttributeNames: {
                "#T": titleKey,
                "#P": pagesKey
            },
            ExpressionAttributeValues: {
                ':t': marshall(titleValue)
                ,
                ':p': marshall(pagesValue)
            
            },
            TableName: process.env.TABLE_NAME,
            UpdateExpression: 'SET #T = :t, #P = :p',
            ReturnValues: 'ALL_NEW'
        }))
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        }
    }
    catch (error) {
        console.log(error)
        return {
            statusCode: 400,
            body: error.message
        }
    }
}