import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export async function deleteBook(context: APIGatewayEvent, dbclient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const docClient = DynamoDBDocumentClient.from(dbclient);

    const response = await dbclient.send(new DeleteItemCommand({
        
    }))
}