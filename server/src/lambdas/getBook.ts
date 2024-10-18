import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
import { z } from 'zod'

export async function getBook(
    event: APIGatewayProxyEvent,
    dbclient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
    if (
        !event.queryStringParameters ||
        !('id' in event.queryStringParameters)
    ) {
        return {
            statusCode: 400,
            body: JSON.stringify('missing id or body'),
        }
    }
    const docClient = DynamoDBDocumentClient.from(dbclient)

    try {
        const id: string = event.queryStringParameters['id']!
        const result = z
            .object({
                id: z.string(),
            })
            .safeParse({ id: id })

        const book = await docClient.send(
            new GetCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    id: result.data!.id,
                },
            })
        )
        if (book.Item) {
            return {
                statusCode: 200,
                body: JSON.stringify(book),
            }
        } else {
            return {
                statusCode: 401,
                body: 'book doesnt exist!',
            }
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify((error as Error).message),
        }
    }
}
