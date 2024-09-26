import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";


export async function updateBook(event: APIGatewayEvent, dbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const parsedBody = JSON.parse(event.body);
    const bodyKeys = Object.keys(parsedBody);
    const titleKey = bodyKeys[0];
    const titleValue = bodyKeys[0];
    const authorKey = bodyKeys[1];
    const authorValue = bodyKeys[1];
    const pagesKey = bodyKeys[2];
    const pagesValue = bodyKeys[2];
    const genreKey = bodyKeys[3];
    const genreValue = bodyKeys[3];
    const priceKey = bodyKeys[4];
    const priceValue = bodyKeys[4];
    const stockKey = bodyKeys[5];
    const stockValue = bodyKeys[5];
    
	
    try {
        const response = await dbClient.send(new UpdateItemCommand({
            Key: {
                id: marshall(event.queryStringParameters["id"])
            },
            ExpressionAttributeNames: {
                "#T": titleKey,
                "#A": authorKey,
                "#PG": pagesKey,
                "#G": genreKey,
                "#PR": priceKey,
                "#S": stockKey
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
        console.log(error)
        return {
            statusCode: 400,
            body: error.message
        }
    }
}