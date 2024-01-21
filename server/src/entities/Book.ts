import { Item } from "./AWSItem";

export class Book extends Item {
  title: string;
  author: string;
  pages: number;
  genre: string;
  price: number;
  stock: number;
  
  constructor(title, author, pages, genre, price, stock) {
    super();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.price = price;
    this.stock = stock;
  }

  get pk(): string {
    throw new Error("Method not implemented.");
  }
  get sk(): string {
    throw new Error("Method not implemented.");
  }
  toItem(): Record<string, unknown> {
    throw new Error("Method not implemented.");
  }
}