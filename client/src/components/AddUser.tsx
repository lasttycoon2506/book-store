import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function AddUser() {
    const [userName, setUserName] = useState<string>()
    const [password, setPassword] = useState<string>()

    function submit(event: any) {
        //backend code here
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
                <Button variant="contained" size="large" type="submit">
                    Create
                </Button>
            </Box>
            <br />
        </div>
    )
}