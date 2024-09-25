import { useEffect, useState } from "react";
import { Database } from "../services/Database"
import type { Book as BookModel} from "../models/model";
import Book from "./Book";
import { NavLink } from "react-router-dom";

type ViewAllBooksProps = {
    database: Database;
}

export default function ViewAllBooks({database}: ViewAllBooksProps){
    const [books, setBooks] = useState<BookModel[]>();

    useEffect(() => {
        const getAllBooks = async () => { 
            const allBooks = await database.getAllBooks();
            setBooks(allBooks);
        }
        getAllBooks();
    }, []);

    function renderAllBooks() {
        if (!database.isAuthorized()) {
            return <NavLink to={"/login"}> Must Login First</NavLink>
        }
        const bookList: any[] = [];
        if (books) {
            for(const book of books){
                bookList.push(
                    <Book 
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        pages={book.pages}
                        genre={book.genre}
                        price={book.price}
                        stock={book.stock}
                        />
                )
            }
        }
        return bookList;
    };

    return (
        <div>
            <h3> All Books </h3>
            {renderAllBooks()}
        </div>
    );
}