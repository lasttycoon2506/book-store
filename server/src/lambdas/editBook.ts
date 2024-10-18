import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Book as BookModel } from '../models/Book'
import { z } from 'zod'

type Book = z.infer<typeof BookModel>

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
        const book: Book = JSON.parse(event.body)
        const result = BookModel.safeParse({
            title: book.title,
            author: book.author,
            pages: book.pages,
            genre: book.genre,
            price: book.price,
            stock: book.stock,
        })
        if (!result.success) {
            return {
                statusCode: 400,
                body: JSON.stringify(result.error.issues),
            }
        }

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
                    ':t': marshall(result.data.title),
                    ':a': marshall(result.data.author),
                    ':pg': marshall(result.data.pages),
                    ':g': marshall(result.data.genre),
                    ':pr': marshall(result.data.price),
                    ':s': marshall(result.data.stock),
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
