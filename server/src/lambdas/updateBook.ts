import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export async function updateBook(context: APIGatewayEvent, dbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const docClient = DynamoDBDocumentClient.from(dbClient);

    const response = docClient.send(new UpdateCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
            id: context.queryStringParameters["id"]
        }
    }))
}