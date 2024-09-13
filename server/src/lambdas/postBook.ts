import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function postBook(event: APIGatewayProxyEvent, dbclient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    return 
}