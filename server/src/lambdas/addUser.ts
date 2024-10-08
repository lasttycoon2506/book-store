import {
    CognitoIdentityProviderClient,
    AdminCreateUserCommand,
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
        const password = parsedBody['password']
        const name = parsedBody['name']
        const email = parsedBody['email']
        const phoneNumber = parsedBody['phoneNumber']

        const input = {
            UserPoolId: AuthenticationStack.BookstoreUserPoolId,
            Username: userName,
            TemporaryPassword: password,
            UserAttributes: [
                {
                    Name: 'name',
                    Value: name,
                },
                {
                    Name: 'email',
                    Value: email,
                },
                {
                    Name: 'phone_number',
                    Value: phoneNumber,
                },
            ],
            DesiredDeliveryMediums: ['SMS' as const],
            MessageAction: "SUPPRESS" as const,
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
