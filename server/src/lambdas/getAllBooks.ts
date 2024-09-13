import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyResult } from "aws-lambda";


export async function getAllBooks(dbclient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    try {
    const allBooks = await dbclient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME
    }));

    const allBooksUnmarshalled = allBooks.Items.map(item => unmarshall(item));
    return allBooksUnmarshalled;

    }
    catch (error) {
        console.log(error)
        return {
            statusCode: 400,
            message: error.message
        };
    }    
    
}