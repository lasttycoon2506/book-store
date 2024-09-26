import { useEffect, useState } from "react";
import { Database } from "../services/Database"
import type { Book as BookModel} from "../models/model";
import { NavLink, useNavigate } from "react-router-dom";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import styled from "@mui/material/styles/styled";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { GridRowsProp } from "@mui/x-data-grid/models/gridRows";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
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

    // const StyledTableCell = styled(TableCell)(({ theme }) => ({
    //     [`&.${tableCellClasses.head}`]: {
    //       backgroundColor: theme.palette.common.black,
    //       color: theme.palette.common.white,
    //     },
    //     [`&.${tableCellClasses.body}`]: {
    //       fontSize: 14,
    //     },
    //   }));

    //   const StyledTableRow = styled(TableRow)(({ theme }) => ({
    //     '&:nth-of-type(odd)': {
    //       backgroundColor: theme.palette.action.hover,
    //     },
    //     '&:last-child td, &:last-child th': {
    //       border: 0,
    //     },
    //   }));

      
      const rows: GridRowsProp = 
       books!
      ;
      
      const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'author', headerName: 'Author', width: 150 },
        { field: 'pages', headerName: 'Pages', width: 150 },
        { field: 'genre', headerName: 'Genre', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'stock', headerName: 'Stock', width: 150 }
      ];
      

    function loadAllBooks() {
        if (!database.isAuthorized()) {
            return <NavLink to={"/login"}> Must Login First</NavLink>
        }
        return (
          <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
        </div>
        )
        
        // if (books) {
        //   return (
        //     <TableContainer component={Paper}>
        //       <Typography
        //           sx={{ flex: '1 1 100%' }}
        //           variant="h3"
        //           id="tableTitle"
        //           component="div"
        //           align='center'
        //         >
        //           All Books
        //         </Typography>
        //       <Table sx={{ minWidth: 900 }} aria-label="customized table">
        //         <TableHead>
        //           <TableRow>
        //             <StyledTableCell align='center'> Title </StyledTableCell>
        //             <StyledTableCell align="center"> Author </StyledTableCell>
        //             <StyledTableCell align="center"> Pgs </StyledTableCell>
        //             <StyledTableCell align="center"> Genre </StyledTableCell>
        //             <StyledTableCell align="center"> Price </StyledTableCell>    
        //             <StyledTableCell align="center"> Stock </StyledTableCell>
        //             <StyledTableCell align="center"> Edit </StyledTableCell>
        //             <StyledTableCell align="center"> Delete </StyledTableCell>    
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //           {books.map((book) => (
        //             <StyledTableRow key={book.id}>
        //               <StyledTableCell component="th" scope="row" align='center'>  {book.title}  </StyledTableCell>
        //               <StyledTableCell align="center"> {book.author} </StyledTableCell>
        //               <StyledTableCell align="center"> {book.pages} </StyledTableCell>
        //               <StyledTableCell align="center"> {book.genre} </StyledTableCell>
        //               <StyledTableCell align="center"> {book.price} </StyledTableCell>
        //               <StyledTableCell align="center"> {book.stock} </StyledTableCell>
        //               <StyledTableCell align='center'>
        //               <Button
                          
        //                 >
        //                   <IconButton aria-label="edit" size="large">
        //                   <EditIcon />
        //                 </IconButton>
        //               </Button> 
        //               </StyledTableCell>
        //               <StyledTableCell align='center'>
        //               <Button
        //                   onClick={ () => {
        //                     deleteBook(book.id!) 
        //                   }}
        //                 >
        //                   <IconButton aria-label="delete" size="large">
        //                   <DeleteIcon />
        //                 </IconButton>
        //               </Button>
        //               </StyledTableCell>
        //             </StyledTableRow>
        //           ))} 
        //         </TableBody>
        //       </Table>
        //       <Typography align='center'
        //           >  <Button
        //           onClick={() => {
        //             navigate("/createBook")
        //           }}
        //           variant="contained"
        //           size='large'
        //         >
        //           Add
        //       </Button>
        //         </Typography>
        //   </TableContainer>
        //   );
      //};
    };

    return (
      loadAllBooks()
    )

}