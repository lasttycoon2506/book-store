import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Context } from "vm";
import { getBook } from "./getBook";
import { getAllBooks } from "./getAllBooks";
import { postBook } from "./postBook";
import { deleteBook } from "./deleteBook";
import { updateBook } from "./updateBook";

const dbClient = new DynamoDBClient({})

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    let response: APIGatewayProxyResult;

    switch (event.httpMethod) {
        case "GET": 
            if (event.queryStringParameters) {
                const response = await getBook(event, dbClient);
                return response;
            }
            else {
                response = await getAllBooks(dbClient);
                return response;
            }
        case "POST":
            response = await postBook(event, dbClient);
            return response;
        case "PUT":
            response = await updateBook(event, dbClient)
            return response;
        case "DELETE":
            response = await deleteBook(event, dbClient)
            return response;
    }
    
}


