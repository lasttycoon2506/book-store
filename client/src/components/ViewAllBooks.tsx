import { useEffect, useState } from "react";
import { Database } from "../services/Database"
import type { Book as BookModel} from "../models/model";
import { NavLink } from "react-router-dom";
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
        return (
            <TableContainer component={Paper}>
          <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h3"
              id="tableTitle"
              component="div"
              align='center'
            >
              Your Exercises
            </Typography>
          <Table sx={{ minWidth: 900 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'> Name </StyledTableCell>
                <StyledTableCell align="center">Reps</StyledTableCell>
                <StyledTableCell align="center">Weight</StyledTableCell>
                <StyledTableCell align="center">Unit (LB / KG)</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>    
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>    
                </TableRow>
            </TableHead>
            <TableBody>
              {exercises.map((exercise) => (
                <StyledTableRow key={exercise}>
                  <StyledTableCell component="th" scope="row" align='center'>  {exercise.name}  </StyledTableCell>
                  <StyledTableCell align="center">{exercise.reps}</StyledTableCell>
                  <StyledTableCell align="center">{exercise.weight}</StyledTableCell>
                  <StyledTableCell align="center">{exercise.unit}</StyledTableCell>
                  <StyledTableCell align="center">{exercise.date}</StyledTableCell>
                  <StyledTableCell align='center'> 
                  <Button
                      onClick={() => {
                        onEdit(exercise);
                      }}
                    >
                      <IconButton aria-label="edit" size="large">
                      <EditIcon />
                    </IconButton>
                  </Button> 
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                  <Button
                      onClick={() => {
                        onDelete(exercise._id);
                      }}
                    >
                      <IconButton aria-label="delete" size="large">
                      <DeleteIcon />
                    </IconButton>
                  </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))} 
            </TableBody>
          </Table>
          <Typography align='center'
              >  <Button
              onClick={() => {
                navigate('/add-exercise')
              }}
              variant="contained"
              size='large'
            >
              Add
          </Button>
            </Typography>
        </TableContainer>
        );
    };

}