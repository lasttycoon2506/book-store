import { useState } from 'react'
import { Authentication } from '../services/Authentication'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { FieldValues, useForm } from 'react-hook-form'

type LoginProps = {
    authentication: Authentication
}

export default function Login({ authentication }: LoginProps): JSX.Element {
    const [loginSuccessMsg, setLoginSuccessMsg] = useState<string>('')
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    function refreshPage(): void {
        window.location.reload()
    }

    async function submit(data: FieldValues): Promise<void> {
        const loginResult = await authentication.login(
            data.userName,
            data.password
        )
        if (loginResult instanceof Error) {
            setLoginSuccessMsg(loginResult.message)
        } else if (loginResult) {
            navigate('/')
            refreshPage()
        }
    }

    function renderForm(): JSX.Element {
        return (
            <div role="main">
                <h2>Please login</h2>
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit((data: FieldValues) => {
                        submit(data)
                    })}
                >
                    <TextField
                        {...register('userName', {
                            required: 'Username is required',
                        })}
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
                    <TextField
                        {...register('password', {
                            required: 'Password is required',
                        })}
                        placeholder="Password"
                        fullWidth
                        variant="filled"
                    />
                    <span className="error">
                        {errors['password']?.message ? (
                            String(errors['password']?.message)
                        ) : (
                            <></>
                        )}
                    </span>
                    <Button variant="contained" size="large" type="submit">
                        Login
                    </Button>
                </Box>
            </div>
        )
    }
    return renderForm()
}
