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
        const getAllBooksResponse = await fetch(bookstoreApiUrl, {
            method: "GET",
            headers: {
                "Authorization": this.authentication.jwToken!
            }
        });
       const allBooks = await getAllBooksResponse.json()
       return allBooks;
    }
    
    async createBook(book: Book): Promise<string> {
        const postResponse = await fetch(bookstoreApiUrl, {
            method: "POST",
            body: JSON.stringify(book),
            headers: {
                "Authorization": this.authentication.jwToken!
            }
        });
       const postResponseJson = await postResponse.json()
       return postResponseJson.id;
    }

    async editBook(book: Book): Promise<number> {
        const editResponse = await fetch(`${bookstoreApiUrl}?id=${book.id}`, {
            method: "EDIT",
            body: JSON.stringify(book),
            headers: {
                "Authorization": this.authentication.jwToken!
            }
        });
       const editResponseJson = await editResponse.json()
       return editResponseJson.$metadata.httpStatusCode;
    }

    async deleteBook(bookId: string): Promise<number> {
        const deleteResponse = await fetch(`${bookstoreApiUrl}?id=${bookId}`, {
            method: "DELETE",
            headers: {
                "Authorization": this.authentication.jwToken!
            }
        });
       const deleteResponseJson = await deleteResponse.json()
       return deleteResponseJson.$metadata.httpStatusCode;
    }

    isAuthorized() {
        return this.authentication.isAuthorized();
    }
}