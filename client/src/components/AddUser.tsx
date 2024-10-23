import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { Database } from '../services/Database'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { NavLink } from 'react-router-dom'
import { UserSchema } from '../zod/schemas/User'
import { z } from 'zod'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Grid2 from '@mui/material/Grid2'

type AddUserProps = {
    database: Database
}
type User = z.infer<typeof UserSchema>

export default function AddBook({ database }: AddUserProps): JSX.Element {
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
    const [alertOpen, setAlertOpen] = useState<boolean>(true)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: zodResolver(UserSchema) })

    async function submit(data: User): Promise<void> {
        const response = await database.addUser(data)
        if (response === 200) {
            setSubmitSuccess(true)
        } else {
            console.error('Unable to create User!')
        }
    }

    useEffect(() => {
        reset({
            userName: '',
            name: '',
            email: '',
            phone: '',
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
                    submit(data as User)
                })}
            >
                <div>
                    {submitSuccess ? (
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
                                User Added!
                            </Alert>
                        </Collapse>
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
                            {...register('userName')}
                            placeholder="Username"
                            fullWidth
                            variant="filled"
                        />
                        <span className="error">
                            {errors['userName']?.message ? (
                                String(errors['userName']?.message)
                            ) : (
                                <></>
                            )}
                        </span>
                    </Grid2>
                    <Grid2 size={5}>
                        <TextField
                            {...register('password')}
                            placeholder="Password"
                            fullWidth
                            variant="filled"
                            type="password"
                        />
                        <span className="error">
                            {errors['password']?.message ? (
                                String(errors['password']?.message)
                            ) : (
                                <></>
                            )}
                        </span>
                    </Grid2>
                    <Grid2 size={5}>
                        <TextField
                            {...register('name')}
                            placeholder="Name"
                            fullWidth
                            variant="filled"
                        />
                        <div className="error">
                            {errors['name']?.message ? (
                                String(errors['name']?.message)
                            ) : (
                                <></>
                            )}
                        </div>
                    </Grid2>
                    <Grid2 size={5}>
                        <TextField
                            {...register('email')}
                            placeholder="Email"
                            fullWidth
                            variant="filled"
                        />
                        <div className="error">
                            {errors['email']?.message ? (
                                String(errors['email']?.message)
                            ) : (
                                <></>
                            )}
                        </div>
                    </Grid2>
                    <Grid2 size={5}>
                        <TextField
                            {...register('phone')}
                            placeholder="Phone"
                            fullWidth
                            variant="filled"
                        />
                        <div className="error">
                            {errors['phone']?.message ? (
                                String(errors['phone']?.message)
                            ) : (
                                <></>
                            )}
                        </div>
                    </Grid2>
                    <Grid2 size={{ xs: 'grow', md: 10 }}>
                        <Button variant="contained" size="large" type="submit">
                            Add User
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
        )
    }

    return renderForm()
}
