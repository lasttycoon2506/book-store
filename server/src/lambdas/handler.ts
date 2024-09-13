import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Context } from "vm";

const dbClient = new DynamoDBClient({})

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    switch (event.httpMethod) {
        case 'GET': 
            const response = await getBooks(event, dbClient);
            return response;
    
    }
}