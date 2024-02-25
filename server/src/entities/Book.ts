import { DynamoDB } from 'aws-sdk';
import { Item } from './Item';


export class Book extends Item {
	bookId: number;
	title: string;
	author: string;
	pages: number;
	genre: string;
	price: number;
	stock: number;

	constructor(bookId: number, title: string, author: string, pages: number, genre: string, price: number, stock: number) {
		super();
		this.bookId = bookId;
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.genre = genre;
		this.price = price;
		this.stock = stock;
}

	static fromItem(item?: DynamoDB.AttributeMap): Book {
		if (!item) throw new Error("No book!")
		return new Book(Number(item.bookId.N), String(item.title.S), String(item.author.S), Number(item.pages.N), String(item.genre.S), Number(item.price.N), Number(item.stock.N))
	}

	get pk(): string {
		return `BOOK#${this.bookId}`;
	}

	get sk(): string {
		return `BOOK#${this.bookId}`;
	}

	toItem(): Record<string, unknown> {
		return {
			...this.keys(),
			bookId: { S: (this.bookId) },
			title: { S: this.title },
			author: { S: this.author },
			pages: { N: this.pages.toString() },
			genre: { S: this.genre },
			price: { N: this.price.toString() },
			stock: { N: this.stock.toString() }
		}
	}

}

