import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DeleteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

export async function deleteBook(
    event: APIGatewayEvent,
    dbclient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
    const docClient = DynamoDBDocumentClient.from(dbclient)

    try {
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
        console.log(error)
        return {
            statusCode: 400,
            body: error.message,
        }
    }
}
