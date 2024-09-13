import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { getBook } from "./getBook";

async function handler(event: APIGatewayProxyEvent, dbclient: DynamoDBClient) {
    if (event.queryStringParameters['id']) {
        const response = await getBook(event, dbclient)
        return response
    }
}