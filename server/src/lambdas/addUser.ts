import {
    CognitoIdentityProviderClient,
    AdminCreateUserCommand,
    AdminSetUserPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { AuthenticationStack } from '../../outputs.json'
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from 'aws-lambda/trigger/api-gateway-proxy'
import { User as UserModel } from '../models/User.ts'
import { z } from 'zod'

const config = {
    region: 'us-east-1',
}

const cognitoClient = new CognitoIdentityProviderClient(config)
type User = z.infer<typeof UserModel>

export async function addUser(
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify(' body is null'),
            }
        }
        const user: User = JSON.parse(event.body)
        const result = UserModel.safeParse({
            userName: user.userName,
            password: user.password,
            name: user.name,
            email: user.email,
            phone: user.phone,
        })
        if (!result.success) {
            return {
                statusCode: 400,
                body: JSON.stringify(result.error.issues),
            }
        }

        const userName = result.data?.userName
        const password = result.data?.password
        const name = result.data?.name
        const email = result.data?.email
        const phone = result.data?.phone

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
                    Value: phone,
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
        return {
            statusCode: 400,
            body: JSON.stringify((error as Error).message),
        }
    }
}
