import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";


export async function getAllBooks(dbclient: DynamoDBClient) {
    const allBooks = await dbclient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME
    }));
        
    const allBooksUnmarshalled = allBooks.Items.map(item => unmarshall(item));
    
}