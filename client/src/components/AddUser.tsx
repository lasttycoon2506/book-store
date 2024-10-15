import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { SyntheticEvent, useState } from 'react'
import { Database } from '../services/Database'
import { User } from '../models/User'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { NavLink } from 'react-router-dom'

type AddUserProps = {
    database: Database
}

export default function AddUser({ database }: AddUserProps) {
    const [userName, setUserName] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [phone, setPhone] = useState<string>()
    const [alert, setAlert] = useState<boolean>(false)
    const [alertOpen, setAlertOpen] = useState<boolean>(true)

    async function submit(event: SyntheticEvent): Promise<void> {
        if (userName && password && name && email && phone) {
            const user: User = {
                userName: userName,
                password: password,
                name: name,
                email: email,
                phone: phone,
            }
            const addUserResponse = await database.addUser(user)
            if (addUserResponse === 201) {
                setAlert(true)
                resetFields()
            }
        }
    }

    function resetFields(): void {
        setUserName('')
        setPassword('')
        setName('')
        setEmail('')
        setPhone('')
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
            <div role="main">
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => submit(e)}
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
                                    User Created!
                                </Alert>
                            </Collapse>
                        ) : (
                            <></>
                        )}
                    </div>
                    <TextField
                        value={userName}
                        label="User Name"
                        variant="outlined"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <br />
                    <TextField
                        value={password}
                        label="Password"
                        variant="outlined"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <TextField
                        value={name}
                        label="Name"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <TextField
                        value={email}
                        label="Email"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <TextField
                        value={phone}
                        label="Phone"
                        variant="outlined"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <br />
                    <br />
                    <Button variant="contained" size="large" type="submit">
                        Create
                    </Button>
                </Box>
                <br />
            </div>
        )
    }
    return renderForm()
}
