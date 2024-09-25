import { SyntheticEvent, useState } from "react";
import { Database } from "../services/Database";
import { NavLink } from "react-router-dom";
import { Book } from "../models/model";

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

    const submit = async(event:SyntheticEvent): Promise<void> => {
        event.preventDefault();
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
            setCreateResult(`book ${id} created`);
            setTitle("");
            setAuthor("");
        }
        else {
            setCreateResult("Missing Field(s)!");
        }
    }

    function renderForm(): JSX.Element {
        if (!database.isAuthorized()) {
            return <NavLink to={"/login"}> Must Login First</NavLink>
        }
        return (
            <form onSubmit={(e) => submit(e)}>
                <label> title </label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} /> <br/>
                <label> author </label>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} /> <br/>
                <label> pages </label>
                <input type="number" value={pages} onChange={(e) => setPages(Number(e.target.value))} /> <br/>
                <label> genre </label>
                <input value={genre} onChange={(e) => setGenre(e.target.value)} /> <br/>
                <label> price </label>
                <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /> <br/>
                <label> stock </label>
                <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} /> <br/>
                <input type="submit" value="create book"/>
            </form>
        )
    }

    return (
        <div>
            {renderForm()}
            {createResult} 
        </div>
    );
}