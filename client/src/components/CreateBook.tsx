import { SyntheticEvent, useEffect, useState } from "react";
import { Database } from "../services/Database";
import { NavLink } from "react-router-dom";
import { Book } from "../models/model";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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
    const [createResult, setCreateResult] = useState<string>("");
    const [errorTitle, setErrorTitle] = useState<boolean>(false);

    const submit = async(event:SyntheticEvent): Promise<void> => {
        event.preventDefault();
        isEmpty()
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
            setCreateResult(`${title} by ${author} created`);
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
        else {
            setCreateResult("Missing Field(s)!");
        }
    }

    function isEmpty(inputVal: string | number | undefined): boolean | undefined {
        if (!inputVal) {
            setError(true);
            return;
        }
    }

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
                <br />
                <TextField
                    value={title} label="Title" variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <TextField
                    value={author} label="Author" variant="outlined"
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <br />
                <TextField
                    value={pages} label="Pgs" variant="outlined" type="number"
                    onChange={(e) => setPages(Number(e.target.value))}
                />
                <br />
                <TextField
                    value={genre} label="Genre" variant="outlined"
                    onChange={(e) => setGenre(e.target.value)}
                />
                <br />
                <TextField
                    value={price} label="Price" variant="outlined" type="number" error={error} 
                    onChange={(e) => setPrice(Number(e.target.value))} 
                />
                <br />
                <TextField
                    value={stock} label="Stock" variant="outlined" type="number"
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
            {createResult} 
        </div>
    );
}