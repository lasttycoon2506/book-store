const awsRegion = "us-east-1";

Amplify.configure
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