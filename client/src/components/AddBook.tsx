import { useState } from 'react'
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
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookSchema } from '../zod/schemas/Book'
import { z } from 'zod'
import Grid from '@mui/material/Grid'
import { Grid2 } from '@mui/material'

type AddBookProps = {
    database: Database
}

export default function AddBook({ database }: AddBookProps): JSX.Element {
    const [alert, setAlert] = useState<boolean>(false)
    const [alertOpen, setAlertOpen] = useState<boolean>(true)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(BookSchema) })

    async function submit(data: Book): Promise<void> {
        const addBookResponse = await database.addBook(data)
        if (addBookResponse) {
            setAlert(true)
        } else {
            console.error('Unable to create book!')
        }
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
                autoComplete="off"
                sx={{ flexGrow: 1 }}
                onSubmit={handleSubmit((data: FieldValues) => {
                    submit(data as Book)
                })}
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
                <Grid2 container spacing={2} mt={4}>
                <Grid2 size={6}>
                        <TextField {...register('title')} placeholder="Title" fullWidth/>
                        <span className="error">
                            {errors['title']?.message ? (
                                String(errors['title']?.message)
                            ) : (
                                <></>
                            )}
                        </span>
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField
                            {...register('author')}
                            placeholder="Author"
                            fullWidth
                        />
                        <span className="error">
                            {errors['author']?.message ? (
                                String(errors['author']?.message)
                            ) : (
                                <></>
                            )}
                        </span>
                    </Grid2>
                    <Grid2 size={4}>
                        <TextField
                            type="number"
                            {...register('pages')}
                            placeholder="Pages"
                        />
                        <div className="error">
                            {errors['pages']?.message ? (
                                String(errors['pages']?.message)
                            ) : (
                                <></>
                            )}
                        </div>
                    </Grid2>
                    <Grid2 size={4}>
                        <TextField {...register('genre')} placeholder="Genre" />
                        <div className="error">
                            {errors['genre']?.message ? (
                                String(errors['genre']?.message)
                            ) : (
                                <></>
                            )}
                        </div>
                    </Grid2>
                    <Grid2 size={4}>
                        <TextField {...register('price')} placeholder="Price" />
                        <div className="error">
                            {errors['price']?.message ? (
                                String(errors['price']?.message)
                            ) : (
                                <></>
                            )}
                        </div>
                    </Grid2>
                    <Grid2 size={4}>
                        <TextField
                            type="number"
                            {...register('stock')}
                            placeholder="Stock"
                        />
                        <div className="error">
                            {errors['stock']?.message ? (
                                String(errors['stock']?.message)
                            ) : (
                                <></>
                            )}
                        </div>
                    </Grid2>
                    <Button variant="contained" size="large" type="submit">
                        Add Book
                    </Button>
                </Grid2>
            </Box>
        )
    }

    return renderForm()
}
