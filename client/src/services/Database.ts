import { Authentication } from './Authentication'
import { ApiStack } from '../../../server/outputs.json'
import { Book } from '../models/Book'
import { User } from '../models/User'

const bookstoreApiUrl = ApiStack.booksApiEndpoint04E49D0B + 'books'

export class Database {
    private authentication: Authentication

    constructor(authentication: Authentication) {
        this.authentication = authentication
    }

    async getAllBooks(): Promise<Book[]> {
        const getAllBooksResponse = await fetch(bookstoreApiUrl, {
            method: 'GET',
            headers: {
                Authorization: this.authentication.jwToken!,
            },
        })
        const allBooks = await getAllBooksResponse.json()
        return allBooks
    }

    async addBook(book: Book): Promise<number> {
        const postResponse = await fetch(bookstoreApiUrl, {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                Authorization: this.authentication.jwToken!,
            },
        })
        const postResponseJson = await postResponse.json()
        return postResponseJson.id
    }

    async editBook(book: Book): Promise<number> {
        const editResponse = await fetch(`${bookstoreApiUrl}?id=${book.id}`, {
            method: 'PUT',
            body: JSON.stringify(book),
            headers: {
                Authorization: this.authentication.jwToken!,
            },
        })
        const editResponseJson = await editResponse.json()
        return editResponseJson.$metadata.httpStatusCode
    }

    async deleteBook(id: string): Promise<number> {
        const deleteResponse = await fetch(`${bookstoreApiUrl}?id=${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: this.authentication.jwToken!,
            },
        })
        const deleteResponseJson = await deleteResponse.json()
        return deleteResponseJson.$metadata.httpStatusCode
    }

    async addUser(user: User): Promise<number> {
        const postResponse = await fetch(bookstoreApiUrl, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                Authorization: this.authentication.jwToken!,
            },
        })
        const postResponseJson = await postResponse.json()
        return postResponseJson.id
    }

    public isAuthorized(): boolean {
        return this.authentication.isAuthorized()
    }
}
