import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DeleteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { z } from 'zod'

export async function deleteBook(
    event: APIGatewayEvent,
    dbclient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
    const docClient = DynamoDBDocumentClient.from(dbclient)
    if (
        !event.queryStringParameters ||
        !('id' in event.queryStringParameters)
    ) {
        return {
            statusCode: 400,
            body: JSON.stringify('missing id or body'),
        }
    }
    try {
        const id: string = event.queryStringParameters['id']!
        const result = z
            .object({
                id: z.string(),
            })
            .safeParse({ name: id })

        const response = await docClient.send(
            new DeleteCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    id: event.queryStringParameters['id'],
                },
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
