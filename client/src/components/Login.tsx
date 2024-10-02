import { SyntheticEvent, useState } from "react";
import { Authentication } from "../services/Authentication";
import { Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type LoginProps = {
    authentication: Authentication;
}

export default function Login({authentication}: LoginProps): JSX.Element {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

    function refreshPage() {
        window.location.reload();
      }

    const submit = async (event: SyntheticEvent): Promise<void> => {
        event.preventDefault();
        if (userName && password) {
            const loginResult = await authentication.login(userName, password);
            if (loginResult) {
                setLoginSuccess(true);
                refreshPage();
            }
            else {
                setErrorMsg('Invalid creds.');
            }
        }
        else {
            setErrorMsg('username & pw required');
        };
    };

    function showLoginResult(): JSX.Element | undefined {
        if (errorMsg) {
           return <label> {errorMsg} </label>;
        }
    }

    return (
        <div role="main">
          {loginSuccess && <Navigate to="/profile" replace={true} />}
          <h2>Please login</h2>
          <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                onSubmit={(e) => submit(e)}
          >
            <TextField
                    value={userName} label="User Name" variant="outlined" 
                    onChange={(e) => setUserName(e.target.value)} 
              />
              <br />
              <TextField
                  value={password} label="Password" variant="outlined" type="password"
                  onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <Button variant="contained" size="large" type="submit" >
                  Login
              </Button>
          </Box>
          <br />
          {showLoginResult()}
        </div>
      );
}