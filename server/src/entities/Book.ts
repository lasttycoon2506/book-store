import { Item }from './Item';


export class Book extends Item {
  bookId: number;
  title: string;
  author: string;
  pages: number;
  genre: string;
  price: number;
  stock: number;
}

