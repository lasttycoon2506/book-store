import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';


export async function getBook(event: APIGatewayProxyEvent, dbclient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const bookId = event.queryStringParameters['id'];

    const docClient = DynamoDBDocumentClient.from(dbclient);
    
    try {
    const book = await docClient.send(new GetCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
            id: bookId
    }}))
    return {
        statusCode: 200,
        body: JSON.stringify(book)
    };

    }
    catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            body: error.message
        };
    }
}