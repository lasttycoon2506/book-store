import { useEffect, useState } from "react";
import { Database } from "../services/Database"
import type { Book as BookModel} from "../models/model";
import Book from "./Book";
import { NavLink } from "react-router-dom";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import styled from "@mui/material/styles/styled";
import TableRow from "@mui/material/TableRow";

type ViewAllBooksProps = {
    database: Database;
}

export default function ViewAllBooks({database}: ViewAllBooksProps){
    const [books, setBooks] = useState<BookModel[]>();

    const getAllBooks = async () => { 
        const allBooks = await database.getAllBooks();
        setBooks(allBooks);
    }
    
    useEffect(() => {
        getAllBooks();
    }, []);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

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