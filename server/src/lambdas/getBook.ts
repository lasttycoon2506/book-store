import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";

export async function getBook(event: APIGatewayProxyEvent, dbclient: DynamoDBClient) {
    const bookId = event.body

    
}