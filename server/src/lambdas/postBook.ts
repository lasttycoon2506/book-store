import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { genRandomUUID } from '../utils/uuid'

export async function postBook(
    event: APIGatewayProxyEvent,
    dbclient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
    try {
        const book = JSON.parse(event.body)
        book.id = genRandomUUID()

        await dbclient.send(
            new PutItemCommand({
                TableName: process.env.TABLE_NAME,
                Item: marshall(book),
            })
        )
        return {
            statusCode: 201,
            body: JSON.stringify({ id: book.id }),
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify(error.message),
        }
    }
}
