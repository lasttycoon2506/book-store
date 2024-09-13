import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { getBook } from "./getBook";
import { getAllBooks } from "./getAllBooks";

async function handler(event: APIGatewayProxyEvent, dbclient: DynamoDBClient) {
    if (event.queryStringParameters['id']) {
        const response = await getBook(event, dbclient)
        return response
    }
    else {
        const response = await getAllBooks(dbclient)
        return response
    }
}