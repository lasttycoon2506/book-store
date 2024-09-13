import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export async function getBook(event: APIGatewayProxyEvent, dbclient: DynamoDBClient) {
    const bookId = event.pathParameters

    
    const queryParams = {
        TableName: process.env.TABLE_NAME,
        Key: { bookId }
    }
    

    const command = new GetItemCommand(queryParams)
    const book = await dbclient.send(command
    )
}