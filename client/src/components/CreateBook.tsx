import { SyntheticEvent, useState } from "react";
import { Database } from "../services/Database";
import { NavLink } from "react-router-dom";
import { Book } from "../models/model";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

type CreateBookProps = {
    database: Database;
}

export default function CreateBook({ database }: CreateBookProps): JSX.Element {
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [pages, setPages] = useState<number>();
    const [genre, setGenre] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [stock, setStock] = useState<number>();
    const [successAlert, setSuccessAlert] = useState<boolean>(false);
    const [errorTitle, setErrorTitle] = useState<boolean>(false);
    const [errorAuthor, setErrorAuthor] = useState<boolean>(false);
    const [errorPages, setErrorPages] = useState<boolean>(false);
    const [errorGenre, setErrorGenre] = useState<boolean>(false);
    const [errorPrice, setErrorPrice] = useState<boolean>(false);
    const [errorStock, setErrorStock] = useState<boolean>(false);
    

    const submit = async(event:SyntheticEvent): Promise<void> => {
        event.preventDefault();
        isTitleEmpty(title);
        isAuthorEmpty(author);
        isPagesEmpty(pages!);
        isGenreEmpty(genre);
        isPriceEmpty(price!);
        isStockEmpty(stock!);
        if (title && author && pages && genre && price && stock) {
            const book: Book = {
                title: title,
                author: author,
                pages: pages,
                genre: genre,
                price: price,
                stock: stock
            }
            const id = await database.createBook(book);
            if (id) {
            setSuccessAlert(true);
            setTitle("");
            setAuthor("");
            setPages(0);
            setGenre("");
            setPrice(0);
            setStock(0);
            }
            else {
                console.error("Unable to create book!")
            }
        }
    }

    function isTitleEmpty(title: string): void {
        if (!title) {
            setErrorTitle(true);
            }
        else {
            setErrorTitle(false);
        }
        return;
    }
    function isAuthorEmpty(author: string): void {
        if (!author) {
            setErrorAuthor(true);
            }
        else {
            setErrorAuthor(false);
        }
        return;
    }
    function isPagesEmpty(pages: number): void {
        if (!pages) {
            setErrorPages(true);
            }
        else {
            setErrorPages(false);
        }
        return;
    }
    function isGenreEmpty(genre: string): void {
        if (!genre) {
            setErrorGenre(true);
            }
        else {
            setErrorGenre(false);
        }
        return;
    }
    function isPriceEmpty(price: number): void {
        if (!price) {
            setErrorPrice(true);
            }
        else {
            setErrorPrice(false);
        }
        return;
    }
    function isStockEmpty(stock: number): void {
        if (!stock) {
            setErrorStock(true);
            }
        else {
            setErrorStock(false);
        }
        return;
    }

   
            // <Alert severity="success" onClose={() => {}}>
            //     This Alert displays the default close icon.
            // </Alert>
       
   

    function renderForm(): JSX.Element {
        if (!database.isAuthorized()) {
            return <NavLink to={"/login"}> Must Login First</NavLink>
        }
        return (
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                onSubmit={(e) => submit(e)}
            >
                <div>
                    { successAlert? <Alert severity="success" onClose={() => {}}> Added Book! </Alert>: <></> }
                </div>
                <br />
                <TextField
                    value={title} label="Title" variant="outlined" error={errorTitle}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <TextField
                    value={author} label="Author" variant="outlined" error={errorAuthor}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <br />
                <TextField
                    value={pages} label="Pgs" variant="outlined" type="number" error={errorPages}
                    onChange={(e) => setPages(Number(e.target.value))}
                />
                <br />
                <TextField
                    value={genre} label="Genre" variant="outlined" error={errorGenre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                <br />
                <TextField
                    value={price} label="Price" variant="outlined" type="number" error={errorPrice}
                    onChange={(e) => setPrice(Number(e.target.value))} 
                />
                <br />
                <TextField
                    value={stock} label="Stock" variant="outlined" type="number" error={errorStock}
                    onChange={(e) => setStock(Number(e.target.value))}
                />
                <br />
                <Button variant="contained" size="large" type="submit" >
                    Add Book
                </Button>
            </Box>
        )
    }

    return (
        <div>
            {renderForm()}
        </div>
    );
}