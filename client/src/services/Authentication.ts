import { Amplify } from 'aws-amplify'
import { AuthenticationStack } from '../../../server/outputs.json'
import {
    AuthUser,
    fetchAuthSession,
    getCurrentUser,
    signIn,
    SignInOutput,
    signOut,
} from '@aws-amplify/auth'
import {
    CognitoIdentityProviderClient,
    ListUsersCommand,
} from '@aws-sdk/client-cognito-identity-provider'

import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'
import { AwsCredentialIdentity } from '@aws-sdk/types'
import { UserProfile } from '../models/UserProfile'

const awsRegion: string = 'us-east-1'

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: AuthenticationStack.BookstoreUserPoolId,
            userPoolClientId: AuthenticationStack.BookstoreUserPoolClientId,
            identityPoolId: AuthenticationStack.BookstoreIdentityPoolId,
        },
    },
})

export class Authentication {
    private user: SignInOutput | AuthUser | undefined
    private userName: string = ''
    public jwToken: string | undefined
    private tempCredentials: AwsCredentialIdentity | undefined
    private userProfile: UserProfile = {userName: '', name: '', email: '', phone: '' }

    public async getCurUser(): Promise<AuthUser> {
        const user1 = await getCurrentUser()
        return user1
    }

    public setCurrentUser(currentUser: AuthUser | undefined): void {
        this.user = currentUser
    }

    async login(
        userName: string,
        password: string
    ): Promise<Object | boolean | undefined> {
        try {
            const signInResult: SignInOutput = await signIn({
                username: userName,
                password: password,
                options: {
                    authFlowType: 'USER_PASSWORD_AUTH',
                },
            })
            this.user = signInResult
            if (this.user) {
                this.userName = userName
                await this.getSessionToken()
                await this.getUserInfo()
                this.userProfile.userName = userName
                return { user: this.user, userProfile: this.userProfile }
            }
            return false
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    public async logout(): Promise<void> {
        try {
            await signOut()
            this.setCurrentUser(undefined)
            this.setUserName('')
        } catch (error) {
            console.error(`error signing out: ${error}`)
        }
    }

    private async getSessionToken(): Promise<void> {
        const session = await fetchAuthSession()
        this.jwToken = session.tokens?.idToken?.toString()
    }

    public setSessionToken(): void {
        this.getSessionToken()
    }

    public getUserName(): string {
        return this.userName
    }

    public setUserName(userName: string): void {
        this.userName = userName
    }

    private async getTempCredentials(): Promise<AwsCredentialIdentity> {
        if (!this.tempCredentials) {
            this.tempCredentials = await this.genTempCredentials()
        }
        return this.tempCredentials
    }

    private async genTempCredentials(): Promise<AwsCredentialIdentity> {
        const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${AuthenticationStack.BookstoreUserPoolId}`
        const cognitoIdentity = new CognitoIdentityClient({
            credentials: fromCognitoIdentityPool({
                clientConfig: {
                    region: awsRegion,
                },
                identityPoolId: AuthenticationStack.BookstoreIdentityPoolId,
                logins: {
                    [cognitoIdentityPool]: this.jwToken!,
                },
            }),
        })
        const credentials = await cognitoIdentity.config.credentials()
        return credentials
    }

    private async getUserInfo() {
        const tempCreds = await this.getTempCredentials()
        const cognitoClient = new CognitoIdentityProviderClient({
            region: 'us-east-1',
            credentials: tempCreds,
        })
        const input = {
            UserPoolId: AuthenticationStack.BookstoreUserPoolId,
        }
        const command = new ListUsersCommand(input)
        const response = await cognitoClient.send(command)
        response.Users?.forEach((element) => {
            if (element.Username === this.userName && element.Attributes) {
                element.Attributes.forEach((element) => {
                    if (element.Name === 'email') {
                        this.userProfile.email = element.Value!
                    }
                    if (element.Name === 'phone_number') {
                        this.userProfile.phone = element.Value!
                    }
                    if (element.Name === 'name') {
                        this.userProfile.name = element.Value!
                    }
                })
            }
        })
    }

    public isAuthorized(): boolean {
        if (this.user) {
            return true
        }
        return false
    }

    public getUserProfile() {
        return this.userProfile
    }
}
