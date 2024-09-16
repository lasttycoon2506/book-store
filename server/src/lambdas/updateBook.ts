import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export async function updateBook(context: APIGatewayEvent, dbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    
}