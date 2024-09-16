import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayEvent } from "aws-lambda";

export async function updateBook(context: APIGatewayEvent, dbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    
}