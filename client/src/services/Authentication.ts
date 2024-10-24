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
    ): Promise<SignInOutput | boolean | undefined | Error> {
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
                return this.user
            }
            return false
        } catch (error) {
            if (error instanceof Error) {
                return error
            }
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

    public isAuthorized(): boolean {
        if (this.user) {
            return true
        }
        return false
    }
}
