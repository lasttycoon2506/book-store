import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getBook } from "./getBook";
import { getAllBooks } from "./getAllBooks";
import { Context } from "vm";

const dbClient = new DynamoDBClient({})

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    if (event.queryStringParameters['id']) {
        const response = await getBook(event, dbClient);
        return response;
    }
    else {
        const response = await getAllBooks(dbClient);
        return response;
    }
}