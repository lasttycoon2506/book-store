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
        const book = {} as any;
        book.title = title;
        book.author = author;
        const postResult = await fetch(bookstoreApiUrl, {
            method: "POST",
            body: JSON.stringify(book),
            headers: {
                "Authorization": this.authentication.jwToken!
            }
        });
       const postResultJson = await postResult.json()
       return postResultJson.id;
    }


    isAuthorized() {
        return true;
    }
}