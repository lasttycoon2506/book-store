import { Item }from './Item';


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
}

