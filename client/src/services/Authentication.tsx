

export class Authentication {
    async login(userName: string, password: string): Promise<Object | undefined> {
        return {
            user: 'chacha'
        };
    };
    public getUserName() {
        return 'some user';
    };
}