import {
    CognitoIdentityProviderClient,
    AdminCreateUserCommand,
    AdminSetUserPasswordCommand,
    AdminAddUserToGroupCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { AuthenticationStack } from '../../outputs.json'
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from 'aws-lambda/trigger/api-gateway-proxy'

const config = {
    region: 'us-east-1',
}

const cognitoClient = new CognitoIdentityProviderClient(config)

export async function addUser(
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
    try {
        const user = JSON.parse(event.body)
        const userName = user['userName']
        const password = user['password']
        const name = user['name']
        const email = user['email']
        const phoneNumber = user['phone']

        const newUserInput = {
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
            MessageAction: 'SUPPRESS' as const,
        }
        const createUser = new AdminCreateUserCommand(newUserInput)
        const newUserResponse = await cognitoClient.send(createUser)
        const setUserPwInput = {
            UserPoolId: AuthenticationStack.BookstoreUserPoolId,
            Username: userName,
            Password: password,
            Permanent: true,
        }
        const setUserPw = new AdminSetUserPasswordCommand(setUserPwInput)
        const setUserPwResponse = await cognitoClient.send(setUserPw)
       
// const input3 = { // AdminAddUserToGroupRequest
//   UserPoolId: AuthenticationStack.BookstoreUserPoolId, // required
//   Username: userName, // required
//   GroupName: "admins", // required
// };
// const command3 = new AdminAddUserToGroupCommand(input3);
// const response = await cognitoClient.send(command3);

        return {
            statusCode: 201,
            body: JSON.stringify(newUserResponse),
        }
    } catch (error) {
        console.error(error)
        return {
            statusCode: 400,
            body: error,
        }
    }
}
