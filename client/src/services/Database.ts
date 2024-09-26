import { Authentication } from "./Authentication";
import { ApiStack } from "../../../server/outputs.json"
import { Book } from "../models/model";

const bookstoreApiUrl = ApiStack.booksApiEndpoint04E49D0B + 'books';

export class Database {
    private authentication: Authentication;

    constructor(authentication: Authentication){
        this.authentication = authentication;
    }

    async getAllBooks(): Promise<Book[]> {
        const getAllBooksResult = await fetch(bookstoreApiUrl, {
            method: "GET",
            headers: {
                "Authorization": this.authentication.jwToken!
            }
        });
       const allBooks = await getAllBooksResult.json()
       return allBooks;
    }
    
    async createBook(book: Book): Promise<string> {
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

    async deleteBook(bookId: string): Promise<number> {
        const deleteResult = await fetch(`${bookstoreApiUrl}?id=${bookId}`, {
            method: "DELETE",
            headers: {
                "Authorization": this.authentication.jwToken!
            }
        });
       const deleteResultJson = await deleteResult.json()
       return deleteResultJson.$metadata.httpStatusCode;
    }

    isAuthorized() {
        return this.authentication.isAuthorized();
    }
}