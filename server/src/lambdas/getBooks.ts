import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent } from "aws-lambda";


export async function getBooks(event: APIGatewayProxyEvent, dbclient: DynamoDBClient) {
    const allBooks = dbclient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME
    }
        
    
    ))
}