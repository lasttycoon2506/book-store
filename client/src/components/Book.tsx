import type { Book } from "../models/model";

export default function Book(props: Book): JSX.Element {
    return (
        <div className='bookComponent'>
            <label className='title'>{props.title}</label>
            <br />
            <label className='author'>{props.author}</label>
            <br />
            <label className='pages'>{props.pages}</label>
            <br />
            <label className='genre'>{props.genre}</label>
            <br />
            <label className='price'>{props.price}</label>
            <br />
            <label className='stock'>{props.stock}</label>
        </div>
    );
}

