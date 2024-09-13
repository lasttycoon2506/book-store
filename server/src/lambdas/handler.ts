import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Context } from "vm";
import { getBook } from "./getBook";
import { getAllBooks } from "./getAllBooks";

const dbClient = new DynamoDBClient({})

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    switch (event.httpMethod) {
        case 'GET': 
            if (event.queryStringParameters['id']) {
                const response = await getBook(event, dbClient);
                return response;
            }
            else {
                const response = await getAllBooks(dbClient)
                return response
            }
    }
}