import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";
import { unmarshall } from "@aws-sdk/util-dynamodb";


export async function getBooks(event: APIGatewayProxyEvent, dbclient: DynamoDBClient) {
    const allBooks = await dbclient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME
    }));
        
    const allBooksUnmarshalled = allBooks.Items.map(item => unmarshall(item));
}