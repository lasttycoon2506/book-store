import { SyntheticEvent, useState } from 'react'
import { Authentication } from '../services/Authentication'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'

type LoginProps = {
    authentication: Authentication
}

export default function Login({ authentication }: LoginProps): JSX.Element {
    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    function refreshPage(): void {
        window.location.reload()
    }

    async function submit(event: SyntheticEvent): Promise<void> {
        event.preventDefault()
        if (userName && password) {
            const loginResult = await authentication.login(userName, password)
            if (loginResult) {
                navigate('/')
                refreshPage()
            }
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
                    onSubmit={(e) => submit(e)}
                >
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
                    <TextField
                       {...register('password')}
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
