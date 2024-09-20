import { useState } from "react";
import { Database } from "../services/Database";
import { NavLink } from "react-router-dom";

type CreateBookProps = {
    database: Database;
}

export default function CreateBook({ database }: CreateBookProps) {
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");

    function submit(){

    }

    function renderForm() {
        if (!database.isAuthorized()) {
            return <NavLink to="/login"> Login </NavLink>
        }
        return (
            <form onSubmit={(e) => submit(e)}>
                <label> title </label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <label> author </label>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} />
            </form>
        )
    }

}