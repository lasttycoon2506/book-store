import { useState } from "react";
import { Authentication } from "../services/Authentication";

type LoginProps = {
    authentication: Authentication;
    setUserNameCb: (userName: string) => void;
}

export default function Login({authentication, userNameCb}: LoginProps) {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
}