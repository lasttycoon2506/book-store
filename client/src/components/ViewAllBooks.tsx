import { useState } from "react";
import { Database } from "../services/Database"
import { Book } from "../models/model";

type ViewAllBooksProps = {
    database: Database;
}

export default function ViewAllBooks(database: ViewAllBooksProps){
    const [books, setBooks] = useState<Book[]>();

    
}