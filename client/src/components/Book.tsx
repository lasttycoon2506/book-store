import type { Book } from "../models/model";

export default function Book(props: Book): JSX.Element {
    return (
        <div className='bookComponent'>
            <label className='title'>{props.title}</label>
            <label className='author'>{props.author}</label>
            <label className='pages'>{props.pages}</label>
            <label className='genre'>{props.genre}</label>
            <label className='price'>{props.price}</label>
            <label className='stock'>{props.stock}</label>
        </div>
    );
}

