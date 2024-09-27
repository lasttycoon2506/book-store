import { useEffect, useState } from "react";
import { Database } from "../services/Database"
import type { Book as BookModel} from "../models/model";
import { NavLink, useNavigate } from "react-router-dom";
import type {} from '@mui/x-data-grid/themeAugmentation';
import { GridRowsProp, GridValidRowModel } from "@mui/x-data-grid/models/gridRows";
import { GridColDef, GridValueSetter } from "@mui/x-data-grid/models/colDef/gridColDef";
import { DataGrid } from "@mui/x-data-grid/DataGrid/DataGrid";


type ViewAllBooksProps = {
    database: Database;
}

export default function ViewAllBooks({database}: ViewAllBooksProps){
    const [books, setBooks] = useState<BookModel[]>();
    const navigate = useNavigate();
    
    const deleteBook = async (bookId: string) => {
        const statusCode = await database.deleteBook(bookId);
        if (statusCode === 200) {
          const updatedBookList = books?.filter(book => book.id !== bookId);
          setBooks(updatedBookList);
        }
        else {
          console.error(`Unable to delete Book status code: ${statusCode}`)
        }
    };

    useEffect(() => {
      const getAllBooks = async () => { 
        const books = await database.getAllBooks();
        setBooks(books);
      }
        getAllBooks();
    }, []);
      
    const setUpdatedTitle: GridValueSetter<GridValidRowModel> = (value, row) => {
      const [title] = value;
      return { ...row, title };
    };
    const setUpdatedAuthor: GridValueSetter<GridValidRowModel> = (value, row) => {
      const author = value;
      return { ...row, author };
    };
    const setUpdatedPgs: GridValueSetter<GridValidRowModel> = (value, row) => {
      const [pages] = value;
      return { ...row, pages };
    };
    const setUpdatedGenre: GridValueSetter<GridValidRowModel> = (value, row) => {
      const [genre] = value;
      return { ...row, genre };
    };
    const setUpdatedPrice: GridValueSetter<GridValidRowModel> = (value, row) => {
      const [price] = value;
      return { ...row, price };
    };
    const setUpdatedStock: GridValueSetter<GridValidRowModel> = (value, row) => {
      const [stock] = value;
      return { ...row, stock };
    };

    const saveUpdatedCellToDb = async (updatedRow: any) => {
      const updatedResponse = await database.editBook(updatedRow);
    }

    const rows: GridRowsProp = books!;

    const columns: GridColDef[] = [
      { field: 'title', headerName: 'Title', width: 150, editable: true, valueSetter: setUpdatedTitle},
      { field: 'author', headerName: 'Author', width: 150, editable: true, valueSetter: setUpdatedAuthor},
      { field: 'pages', headerName: 'Pages', width: 150, editable: true, valueSetter: setUpdatedPgs},
      { field: 'genre', headerName: 'Genre', width: 150, editable: true, valueSetter: setUpdatedGenre},
      { field: 'price', headerName: 'Price', width: 150, editable: true, valueSetter: setUpdatedPrice},
      { field: 'stock', headerName: 'Stock', width: 150, editable: true, valueSetter: setUpdatedStock},
    ];
      

    function loadAllBooks() {
        if (!database.isAuthorized()) {
            return <NavLink to={"/login"}> Must Login First</NavLink>
        }
        return (
          <div style={{ height: 300, width: '100%' }}>
        <DataGrid 
          rows={rows} 
          columns={columns}
          processRowUpdate={(updatedRow, originalRow) => {
            saveUpdatedCellToDb(updatedRow);
          }}
          />
        </div>
        )
    };

    return (
      loadAllBooks()
    )

}