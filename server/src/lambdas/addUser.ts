import { CognitoIdentityProviderClient, AdminCreateUserCommand } from "@aws-sdk/client-cognito-identity-provider";


type User = {
    userName: string;
    passWord: string;
}

const config = {
    region: 'us-east-1'
}

const client = new CognitoIdentityProviderClient(config);

export function addUser(user: User): Promise<unknown> {
    return
}


