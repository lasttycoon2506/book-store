import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function postBook(event: APIGatewayProxyEvent, dbclient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const book = event.body;

    const postResult = dbclient.send(new PutItemCommand({
        TableName: 'books-table',
        Item: marshall(book)
    }
    ))
}