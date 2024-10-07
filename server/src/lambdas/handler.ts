import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getBook } from './getBook'
import { getAllBooks } from './getAllBooks'
import { postBook } from './postBook'
import { deleteBook } from './deleteBook'
import { updateBook } from './updateBook'
import { addCorsHeader } from '../utils/corsHeader'
import { addUser } from './addUser'

const dbClient = new DynamoDBClient({})

async function handler(
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
    let response: APIGatewayProxyResult

    switch (event.httpMethod) {
        case 'GET': {
            if (event.queryStringParameters) {
                const getResponse = await getBook(event, dbClient)
                response = getResponse
            } else {
                const getAllResponse = await getAllBooks(dbClient)
                response = getAllResponse
            }
            break
        }
        case 'POST': {
            if (event.body.includes('userName')) {
                const postUserResponse = await addUser(event)
                response = postUserResponse
            } else {
                const postBookResponse = await postBook(event, dbClient)
                response = postBookResponse
            }
            break
        }
        case 'PUT': {
            const putResponse = await updateBook(event, dbClient)
            response = putResponse
            break
        }
        case 'DELETE': {
            const deleteResponse = await deleteBook(event, dbClient)
            response = deleteResponse
            break
        }
    }

    addCorsHeader(response)
    return response
}

export { handler }
