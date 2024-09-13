import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { genRandomUUID } from "../utils/uuid";


export async function postBook(event: APIGatewayProxyEvent, dbclient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    try {
        const book = JSON.parse(event.body);
        book.id = genRandomUUID();

        const postResult = dbclient.send(new PutItemCommand({
            TableName: 'books-table',
            Item: marshall(book)
        }
        ))
        return {
            statusCode: 201,
            body: book.id
        }
    }
    catch (error) {
        console.log(error)
        return{
            statusCode: 400,
            body: error.message
        }
    }
    
}