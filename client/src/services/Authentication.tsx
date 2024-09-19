import { Amplify } from "aws-amplify";
import { AuthenticationStack } from "../../../server/outputs.json"
import { signIn, SignInOutput } from "@aws-amplify/auth";

// const awsRegion = "us-east-1";

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
    private user: SignInOutput | undefined;
    private userName: string = "";

    
    async login(userName: string, password: string): Promise<Object | undefined> {
        try {
            const signInResult: SignInOutput = await signIn({
                username: userName,
                password: password,
                options: {
                    authFlowType: "USER_PASSWORD_AUTH"
                }
            });
            this.user = signInResult;
            this.userName = userName;
            return this.user;
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    }

    public getUserName(): string {
        return this.userName;
    };
}