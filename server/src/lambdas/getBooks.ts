import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";


export async function getBooks(event: APIGatewayProxyEvent, dbclient: DynamoDBClient) {
    
}