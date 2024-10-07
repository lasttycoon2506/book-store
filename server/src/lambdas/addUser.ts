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
        const passWord = parsedBody['password']
        const input = {
            UserPoolId: `${AuthenticationStack.BookstoreUserPoolId}`,
            Username: `${userName}`,
            UserAttributes: [
                {
                    Name: 'STRING_VALUE',
                    Value: 'STRING_VALUE',
                },
            ],
            ValidationData: [
                {
                    Name: 'STRING_VALUE',
                    Value: 'STRING_VALUE',
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
            statusCode: error.statusCode,
            body: error.message,
        }
    }
}
