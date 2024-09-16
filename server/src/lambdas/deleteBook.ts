import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export async function deleteBook(context: APIGatewayEvent, dbclient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const docClient = DynamoDBDocumentClient.from(dbclient);

    const response = await docClient.send(new DeleteCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
            id: context.queryStringParameters["id"]
        }
    }));

    return {
        statusCode: 201,
        body: JSON.stringify(response)
    };
}