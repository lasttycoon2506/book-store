import { SyntheticEvent, useState } from "react";
import { Authentication } from "../services/Authentication";
import { Navigate } from "react-router-dom";

type LoginProps = {
    authentication: Authentication;
    setUserNameCb: (userName: string) => void;
}

export default function Login({authentication, setUserNameCb}: LoginProps) {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

    const submit = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (userName && password) {
            const loginResult = await authentication.login(userName, password);
            const userName2 = authentication.getUserName();
            if (userName2) {
                setUserNameCb(userName2);
            }
            if (loginResult) {
                setLoginSuccess(true);
            }
            else {
                setErrorMsg('invalid creds.');
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
          <form onSubmit={(e) => submit(e)}>
            <label>User name</label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />``
            <br />
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <br />
            <input type="submit" value="Login" />
          </form>
          <br />
          {showLoginResult()}
        </div>
      );
}