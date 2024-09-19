import { SyntheticEvent, useState } from "react";
import { Authentication } from "../services/Authentication";

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
}