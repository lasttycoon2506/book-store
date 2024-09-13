import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export async function getBook(event: APIGatewayProxyEvent, dbclient: DynamoDBClient) {
    const bookId = event.body



    


    dbclient.send(new GetItemCommand({

    }))
}