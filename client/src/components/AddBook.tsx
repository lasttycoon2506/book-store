import { useEffect, useState } from 'react'
import { Database } from '../services/Database'
import { NavLink } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookSchema } from '../zod/schemas/Book'
import { z } from 'zod'
import Grid2 from '@mui/material/Grid2'
import FilledInput from '@mui/material/FilledInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'

type AddBookProps = {
    database: Database
}
type Book = z.infer<typeof BookSchema>

export default function AddBook({ database }: AddBookProps): JSX.Element {
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: zodResolver(BookSchema) })

    async function submit(data: Book): Promise<void> {
        const response = await database.addBook(data)
        if (response.status === 200 || response.status === 201) {
            setSubmitSuccess(true)
            setTimeout(() => setSubmitSuccess(false), 5000)
        } else {
            const errMsg = await response.json()
            console.error(errMsg)
        }
    }

    useEffect(() => {
        reset({
            title: '',
            author: '',
            pages: '',
            genre: '',
            price: '',
            stock: '',
        })
    }, [submitSuccess])

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
                onSubmit={handleSubmit((data: FieldValues) => {
                    submit(data as Book)
                })}
            >
                <div>
                    {submitSuccess ? (
                        <Alert
                            variant="filled"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setSubmitSuccess(false)
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            Book Added!
                        </Alert>
                    ) : (
                        <></>
                    )}
                </div>
                <Grid2
                    container
                    spacing={8}
                    mt={6}
                    sx={{ justifyContent: 'center' }}
                >
                    <Grid2 size={5}>
                        <TextField
                            {...register('title')}
                            placeholder="Title"
                            fullWidth
                            variant="filled"
                        />
                        <span className="error">
                            {errors['title']?.message ? (
                                String(errors['title']?.message)
                            ) : (
                                <></>
                            )}
                        </span>
                    </Grid2>
                    <Grid2 size={5}>
                        <TextField
                            {...register('author')}
                            placeholder="Author"
                            fullWidth
                            variant="filled"
                        />
                        <span className="error">
                            {errors['author']?.message ? (
                                String(errors['author']?.message)
                            ) : (
                                <></>
                            )}
                        </span>
                    </Grid2>
                    <Grid2 size={5}>
                        <TextField
                            type="number"
                            {...register('pages')}
                            placeholder="Pages"
                            fullWidth
                            variant="filled"
                        />
                        <div className="error">
                            {errors['pages']?.message ? (
                                String(errors['pages']?.message)
                            ) : (
                                <></>
                            )}
                        </div>
                    </Grid2>
                    <Grid2 size={5}>
                        <TextField
                            {...register('genre')}
                            placeholder="Genre"
                            fullWidth
                            variant="filled"
                        />
                        <div className="error">
                            {errors['genre']?.message ? (
                                String(errors['genre']?.message)
                            ) : (
                                <></>
                            )}
                        </div>
                    </Grid2>
                    <FormControl sx={{ m: 1 }} variant="filled">
                        <FilledInput
                            {...register('price')}
                            placeholder="Price"
                            startAdornment={
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            }
                        />
                        <div className="error">
                            {errors['price']?.message ? (
                                String(errors['price']?.message)
                            ) : (
                                <></>
                            )}
                        </div>
                    </FormControl>
                    <FormControl sx={{ m: 1 }} variant="filled">
                        <TextField
                            type="number"
                            {...register('stock')}
                            placeholder="Stock"
                            fullWidth
                            variant="filled"
                        />
                        <div className="error">
                            {errors['stock']?.message ? (
                                String(errors['stock']?.message)
                            ) : (
                                <></>
                            )}
                        </div>
                    </FormControl>
                    <Grid2 size={{ md: 10 }}>
                        <Button variant="contained" size="large" type="submit">
                            Add Book
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
        )
    }

    return renderForm()
}
