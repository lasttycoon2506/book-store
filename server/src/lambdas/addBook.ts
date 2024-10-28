 
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { genRandomUUID } from '../utils/uuid'
import { z } from 'zod'
import { Book as BookModel } from '../models/Book'

type Book = z.infer<typeof BookModel>

export async function addBook(
    event: APIGatewayProxyEvent,
    dbclient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify('body missing'),
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

        result.data.id = genRandomUUID()
        const response = await dbclient.send(
            new PutItemCommand({
                TableName: process.env.TABLE_NAME,
                Item: marshall(result.data),
            })
        )
        return {
            statusCode: 201,
            body: JSON.stringify(response),
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify((error as Error).message),
        }
    }
}
