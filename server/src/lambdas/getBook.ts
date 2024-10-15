import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'

export async function getBook(
    event: APIGatewayProxyEvent,
    dbclient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
    if ('id' in event.queryStringParameters) {
        const docClient = DynamoDBDocumentClient.from(dbclient)

        try {
            const book = await docClient.send(
                new GetCommand({
                    TableName: process.env.TABLE_NAME,
                    Key: {
                        id: event.queryStringParameters['id'],
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
            console.log(error)
            return {
                statusCode: 400,
                body: error,
            }
        }
    } else {
        return {
            statusCode: 400,
            body: 'id missing',
        }
    }
}
