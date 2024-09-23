import { Amplify } from "aws-amplify";
import { AuthenticationStack } from "../../../server/outputs.json"
import { AuthUser, fetchAuthSession, getCurrentUser, signIn, SignInOutput } from "@aws-amplify/auth";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

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
    private user: SignInOutput | AuthUser | undefined;
    private userName: string = "";
    private jwToken: string | undefined;
    private tempCredentials: Object | undefined;

    
    async login(userName: string, password: string): Promise<Object | undefined> {
        try {
            const user = await getCurrentUser();
            if (user) {
                if (userName !== user.username) {
                    return false;
                }
                this.user = user;
                this.userName = user.username;
                await this.getSessionToken();
                return this.user;
            }
            else {
                const signInResult: SignInOutput = await signIn({
                    username: userName,
                    password: password,
                    options: {
                        authFlowType: "USER_PASSWORD_AUTH"
                    }
                });
                this.user = signInResult;
            }
            this.userName = userName;
            await this.getSessionToken();
            return this.user;
        }
        catch (error) {
            console.log(error)
            return undefined;
        }
    }

    private async getSessionToken(): Promise<void> {
        const session = await fetchAuthSession();
        this.jwToken = session.tokens?.idToken?.toString();
    }

    public getUserName(): string {
        return this.userName;
    };

    public async getTempCredentials(): Promise<Object> {
        if (!this.tempCredentials) {
            this.tempCredentials = await this.genTempCredentials();
        }
        return this.tempCredentials;
    }

    private async genTempCredentials() {
        const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${AuthenticationStack.BookstoreUserPoolId}`;
        const cognitoIdentity = new CognitoIdentityClient({
            credentials: fromCognitoIdentityPool({
                clientConfig: {
                    region: awsRegion
                },
                identityPoolId: AuthenticationStack.BookstoreIdentityPoolId,
                logins: {
                    [cognitoIdentityPool]: this.jwToken!
                }
            })
        });
        const credentials = await cognitoIdentity.config.credentials();
        return credentials;
    }


}