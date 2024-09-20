import { Authentication } from "./Authentication";

export class Database {
    private authentication: Authentication;

    constructor(authentication: Authentication){
        this.authentication = authentication;
    }
    
    async createBook(title: string, author: string) {
        const tempCreds = this.authentication.getTempCredentials;
        console.log(tempCreds);
        
    }

    isAuthorized() {
        return true;
    }
}