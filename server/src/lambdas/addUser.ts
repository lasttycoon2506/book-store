import {
    CognitoIdentityProviderClient,
    AdminCreateUserCommand,
    AdminCreateUserCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider'
import { AuthenticationStack } from '../../outputs.json'
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from 'aws-lambda/trigger/api-gateway-proxy'

const config = {
    region: 'us-east-1',
}

const client = new CognitoIdentityProviderClient(config)

export async function addUser(
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
    try {
        const parsedBody = JSON.parse(event.body)
        const userName = parsedBody['userName']
        const name = parsedBody['name']
        const email = parsedBody['email']

        const input = {
            UserPoolId: AuthenticationStack.BookstoreUserPoolId,
            Username: userName,
            UserAttributes: [
                {
                    Name: 'name',
                    Value: name,
                },
                {
                  Name: 'email',
                  Value: email,
              },
            ],
        }
        const command = new AdminCreateUserCommand(input)
        const response = await client.send(command)
        return {
            statusCode: 201,
            body: JSON.stringify(response),
        }
    } catch (error) {
        console.error(error)
        return {
            statusCode: 400,
            body: error.message,
        }
    }
}
