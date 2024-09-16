import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayEvent } from "aws-lambda";

export async function deleteBook(context: APIGatewayEvent, dbclient: DynamoDBClient): Promise<APIGatewayResult> {

}