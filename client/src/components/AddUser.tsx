import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { ChangeEvent, forwardRef, useEffect, useState } from 'react'
import { Database } from '../services/Database'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { NavLink } from 'react-router-dom'
import { UserSchema } from '../zod/schemas/User'
import { z } from 'zod'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Grid2 from '@mui/material/Grid2'
import { IMaskInput } from 'react-imask'
import FormControl from '@mui/material/FormControl'
import { InputBaseComponentProps } from '@mui/material/InputBase'

type AddUserProps = {
    database: Database
}
type User = z.infer<typeof UserSchema>
type CustomProps = {
    onChange: (event: { target: { name: string; value: string } }) => void
    name: string
}

const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props
        return (
            <IMaskInput
                {...other}
                mask="(000) 000-0000"
                definitions={{
                    '#': /[1-9]/,
                }}
                inputRef={ref}
                onAccept={(value: string) =>
                    onChange({ target: { name: props.name, value } })
                }
                overwrite
            />
        )
    }
)

export default function AddUser({ database }: AddUserProps): JSX.Element {
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
    const [values, setValues] = useState({
        phone: '',
        numberformat: '1320',
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: zodResolver(UserSchema) })

    async function submit(data: User): Promise<void> {
        data.phone = data.phone.replace(/[^\d]/g, '')
        data.phone = '+' + data.phone
        const response = await database.addUser(data)
        if (response.status === 200 || response.status === 201) {
            setSubmitSuccess(true)
            setTimeout(() => setSubmitSuccess(false), 10000)
        } else {
            const errMsg = await response.json()
            console.error(errMsg)
        }
    }

    useEffect(() => {
        reset({
            userName: '',
            password: '',
            name: '',
            email: '',
            phone: '',
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitSuccess])

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    }

    function renderForm(): JSX.Element {
        if (!database.isAuthorized()) {
            return (
                <>
                    <br />
                    <NavLink to={'/login'} className="error">
                        {' '}
                        Must Login First
                    </NavLink>
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
                            User Added!
                        </Alert>
                    ) : (
                        <></>
                    )}
                </div>
                <Grid2 container spacing={5} sx={{ justifyContent: 'center' }}>
                    <Grid2 size={4.5} mt={5}>
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
                    <Grid2 size={4.5} mt={5}>
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
                    <Grid2 size={4.5}>
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
                    <Grid2 size={4.5}>
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
                    <Grid2 size={4.5}>
                        <FormControl variant="standard">
                            <TextField
                                {...register('phone')}
                                fullWidth
                                placeholder="Phone"
                                variant="filled"
                                onChange={onChange}
                                InputProps={{
                                    inputComponent:
                                        TextMaskCustom as unknown as React.ElementType<InputBaseComponentProps>,
                                }}
                            />
                            <div className="error">
                                {errors['phone']?.message ? (
                                    String(errors['phone']?.message)
                                ) : (
                                    <></>
                                )}
                            </div>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={{ md: 10 }}>
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
