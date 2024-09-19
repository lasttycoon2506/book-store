import { Amplify } from "aws-amplify";
import { AuthenticationStack } from "../../../server/outputs.json"

const awsRegion = "us-east-1";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: AuthenticationStack.BookstoreUserPoolId,
            userPoolClientId: AuthenticationStack.BookstoreUserPoolClientId,
            identityPoolId: AuthenticationStack.BookstoreIdentityPoolId
        }
    }
})

export class Authentication {
    async login(userName: string, password: string): Promise<Object | undefined> {
        return {
            user: 'chacha'
        };
    };
    public getUserName(): string {
        return 'some user';
    };
}