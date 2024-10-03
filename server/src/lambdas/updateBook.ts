import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";


export async function updateBook(event: APIGatewayEvent, dbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const parsedBody = JSON.parse(event.body);
    const titleValue = parsedBody['title'];
    const authorValue = parsedBody['author'];
    const pagesValue = parsedBody['pages'];
    const genreValue = parsedBody['genre'];
    const priceValue = parsedBody['price'];
    const stockValue = parsedBody['stock'];
    
	
    try {
        const response = await dbClient.send(new UpdateItemCommand({
            Key: {
                id: marshall(event.queryStringParameters["id"])
            },
            ExpressionAttributeNames: {
                "#T": 'title',
                "#A": 'author',
                "#PG": 'pages',
                "#G": 'genre',
                "#PR": 'price',
                "#S": 'stock'
            },
            ExpressionAttributeValues: {
                ':t': marshall(titleValue),
                ':a': marshall(authorValue),
                ':pg': marshall(pagesValue),
                ':g': marshall(genreValue),
                ':pr': marshall(priceValue),
                ':s': marshall(stockValue)
            },
            TableName: process.env.TABLE_NAME,
            UpdateExpression: 'SET #T = :t, #A = :a, #PG = :pg, #G = :g, #PR = :pr, #S = :s',
            ReturnValues: 'ALL_NEW'
        }))
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        }
    }
    catch (error) {
        return {
            statusCode: 400,
            body: error.message
        }
    }
}