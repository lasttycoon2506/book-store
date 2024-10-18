import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

export async function editBook(
    event: APIGatewayEvent,
    dbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify('body missing'),
        }
    }
    const book = JSON.parse(event.body)
    const title = book['title']
    const author = book['author']
    const pages = book['pages']
    const genre = book['genre']
    const price = book['price']
    const stock = book['stock']

    if (
        !event.queryStringParameters ||
        !('id' in event.queryStringParameters)
    ) {
        return {
            statusCode: 400,
            body: JSON.stringify('id or body missing'),
        }
    }

    try {
        const response = await dbClient.send(
            new UpdateItemCommand({
                Key: {
                    id: marshall(event.queryStringParameters['id']),
                },
                ExpressionAttributeNames: {
                    '#T': 'title',
                    '#A': 'author',
                    '#PG': 'pages',
                    '#G': 'genre',
                    '#PR': 'price',
                    '#S': 'stock',
                },
                ExpressionAttributeValues: {
                    ':t': marshall(title),
                    ':a': marshall(author),
                    ':pg': marshall(pages),
                    ':g': marshall(genre),
                    ':pr': marshall(price),
                    ':s': marshall(stock),
                },
                TableName: process.env.TABLE_NAME,
                UpdateExpression:
                    'SET #T = :t, #A = :a, #PG = :pg, #G = :g, #PR = :pr, #S = :s',
                ReturnValues: 'ALL_NEW',
            })
        )
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify((error as Error).message),
        }
    }
}
