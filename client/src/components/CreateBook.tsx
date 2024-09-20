import { useState } from "react";
import { Database } from "../services/Database";
import { NavLink } from "react-router-dom";

type CreateBookProps = {
    database: Database;
}

export default function CreateBook({ database }: CreateBookProps) {
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");

    if (!database.isAuthorized()) {
        return <NavLink to="/login"> Login </NavLink>
    }
}