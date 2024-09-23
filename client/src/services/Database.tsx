import { Authentication } from "./Authentication";
import { ApiStack } from "../../../server/outputs.json"

const bookstoreApiUrl = ApiStack.booksApiEndpoint04E49D0B + 'books';

export class Database {
    private authentication: Authentication;

    constructor(authentication: Authentication){
        this.authentication = authentication;
    }
    
    async createBook(title: string, author: string) {
        const tempCreds = await this.authentication.getTempCredentials();
       
    }

    isAuthorized() {
        return true;
    }
}