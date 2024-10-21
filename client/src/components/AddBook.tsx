import { SyntheticEvent, useState } from 'react'
import { Database } from '../services/Database'
import { NavLink } from 'react-router-dom'
import { Book } from '../models/Book'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Collapse from '@mui/material/Collapse'
import { Field, FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { BookSchema } from '../zod/schemas/Book'
import React from 'react'


type AddBookProps = {
    database: Database
}

export default function AddBook({ database }: AddBookProps): JSX.Element {
    // const [title, setTitle] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [pages, setPages] = useState<number>(0)
    const [genre, setGenre] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)
    const [alert, setAlert] = useState<boolean>(false)
    const [alertOpen, setAlertOpen] = useState<boolean>(true)
    // const [errorTitle, setErrorTitle] = useState<boolean>(false)
    const [errorAuthor, setErrorAuthor] = useState<boolean>(false)
    const [errorPages, setErrorPages] = useState<boolean>(false)
    const [errorGenre, setErrorGenre] = useState<boolean>(false)
    const [errorPrice, setErrorPrice] = useState<boolean>(false)
    const [errorStock, setErrorStock] = useState<boolean>(false)
    const { register, handleSubmit, formState: {errors} } = useForm({resolver: zodResolver(BookSchema)})

   

    // async function handleSubmits(event: SyntheticEvent): Promise<void> {
    //     event.preventDefault()
    //     isTitleEmpty(title)
    //     isAuthorEmpty(author)
    //     isPagesEmpty(pages!)
    //     isGenreEmpty(genre)
    //     isPriceEmpty(price!)
    //     isStockEmpty(stock!)
    //     if (title && author && pages && genre && price && stock) {
    //         const book: Book = {
    //             title: title,
    //             author: author,
    //             pages: pages,
    //             genre: genre,
    //             price: price,
    //             stock: stock,
    //         }
    //         const addBookResponse = await database.addBook(book)
    //         if (addBookResponse) {
    //             setAlert(true)
    //             resetFields()
    //         } else {
    //             console.error('Unable to create book!')
    //         }
    //     }
    // }

    // function isTitleEmpty(title: string): void {
    //     if (!title) {
    //         setErrorTitle(true)
    //     } else {
    //         setErrorTitle(false)
    //     }
    //     return
    // }

    // function inputValidation(data: Book) {
    //     const result = BookZod.safeParse({
    //         title: data.title,
    //         author: data.author,
    //         pages: data.pages,
    //         genre: data.genre,
    //         price: data.price,
    //         stock: data.stock,
    //     })
    //     if (!result.success) {
    //         return {
    //             statusCode: 400,
    //             body: JSON.stringify(result.error.issues),
    //         }
    //     }
    // }
    function isAuthorEmpty(author: string): void {
        if (!author) {
            setErrorAuthor(true)
        } else {
            setErrorAuthor(false)
        }
        return
    }
    function isPagesEmpty(pages: number): void {
        if (!pages) {
            setErrorPages(true)
        } else {
            setErrorPages(false)
        }
        return
    }
    function isGenreEmpty(genre: string): void {
        if (!genre) {
            setErrorGenre(true)
        } else {
            setErrorGenre(false)
        }
        return
    }
    function isPriceEmpty(price: number): void {
        if (!price) {
            setErrorPrice(true)
        } else {
            setErrorPrice(false)
        }
        return
    }
    function isStockEmpty(stock: number): void {
        if (!stock) {
            setErrorStock(true)
        } else {
            setErrorStock(false)
        }
        return
    }

    function resetFields(): void {
        // setTitle('')
        setAuthor('')
        setPages(0)
        setGenre('')
        setPrice(0)
        setStock(0)
    }

    

    function renderForm(): JSX.Element {
        if (!database.isAuthorized()) {
            return (
                <>
                    <br />
                    <NavLink to={'/login'}> Must Login First</NavLink>
                </>
            )
        }
        return (
            <Box
                component="form"
                // sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                // noValidate
                autoComplete="off"
                onSubmit={handleSubmit((data: FieldValues) => {
                    // inputValidation(data as Book)
                    console.log(data)
                })
                }
            >
                <div>
                    {alert ? (
                        <Collapse in={alertOpen}>
                            {' '}
                            <Alert
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setAlertOpen(false)
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                Book Added!
                            </Alert>
                        </Collapse>
                    ) : (
                        <></>
                    )}
                </div>
                <TextField
                    // value={title}
                    // label="Title"
                    // variant="outlined"
                    // error={errorTitle}
                    // onChange={(e) => setTitle(e.target.value)}
                    {...register('title', {
                        required: true,
                        minLength: { value: 1, message: 'min. length 1' },
                    })}
                    placeholder="Title"
                />
                <p>{(errors['title']?.message) ? (String(errors['title']?.message)) : (
                        <></>
                    )}</p>
                <TextField
                    // value={author}
                    // label="Author"
                    // variant="outlined"
                    // error={errorAuthor}
                    // onChange={(e) => setAuthor(e.target.value)}
                    {...register('author', {
                        required: 'Author required',
                        minLength: { value: 1, message: 'min. length 1' },
                    })}
                    placeholder="Author"
                />
                <p>{(errors['author']?.message) ? (String(errors['author']?.message)) : (
                        <></>
                    )}</p>
                <TextField
                    // value={pages}
                    // label="Pgs"
                    // variant="outlined"
                    // error={errorPages}
                    type="number"
                    // onChange={(e) => {
                    //     const value = e.target.value
                    //     if (value === '' || value.match(/^[0-9]*$/)) {
                    //         setPages(Number(value))
                    //     }
                    // }}
                    {...register('pages', {
                        required: 'Pages required',
                        minLength: { value: 1, message: 'min. length 1' },
                    })}
                    placeholder="Pages"
                />
                <p>{(errors['pages']?.message) ? (String(errors['pages']?.message)) : (
                        <></>
                    )}</p>
                <TextField
                    // value={genre}
                    // label="Genre"
                    // variant="outlined"
                    // error={errorGenre}
                    // onChange={(e) => setGenre(e.target.value)}
                    {...register('genre', {
                        required: 'Genre required',
                        minLength: { value: 1, message: 'min. length 1' },
                    })}
                    placeholder="Genre"
                />
                <p>{(errors['genre']?.message) ? (String(errors['genre']?.message)) : (
                        <></>
                    )}</p>
                <TextField
                    // value={price}
                    // label="Price"
                    // variant="outlined"
                    type="number"
                    // error={errorPrice}
                    // onChange={(e) => setPrice(Number(e.target.value))}
                    {...register('price', {
                        required: 'Price required',
                        minLength: { value: 1, message: 'min. length 1' },
                    })}
                    placeholder="Price"
                />
               <p>{(errors['price']?.message) ? (String(errors['price']?.message)) : (
                        <></>
                    )}</p>
                <TextField
                    // value={stock}
                    // label="Stock"
                    // variant="outlined"
                    type="number"
                    // error={errorStock}
                    // onChange={(e) => {
                    //     const value = e.target.value
                    //     if (value === '' || value.match(/^[0-9]*$/)) {
                    //         setStock(Number(value))
                    //     }
                    // }}
                    {...register('stock', {
                        required: 'Stock required',
                        minLength: { value: 1, message: 'min. length 1' },
                    })}
                    placeholder="Stock"
                />
                <p>{(errors['stock']?.message) ? (String(errors['stock']?.message)) : (
                        <></>
                    )}</p>
                <Button variant="contained" size="large" type="submit">
                    Add Book
                </Button>
            </Box>
        )
    }

    return renderForm()
}
