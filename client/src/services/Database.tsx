import { Authentication } from "./Authentication";

export class Database {
    private authentication: Authentication;

    constructor(authentication: Authentication){
        this.authentication = authentication;
    }
    
    async createBook(title: string, author: string) {
        return "123";
    }

    isAuthorized() {
        return true;
    }
}