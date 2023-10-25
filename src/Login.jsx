import { Button } from 'react-bootstrap';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { checkValidUser } from './api/article-api';
import { useContext } from "react";
import { UserContext } from "./UserContext";
import ErrorMessage from './ErrorMessage';

export default function Login() {
    const { user, setUser } = useContext(UserContext)
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [staySignedIn, setStaySignedIn] = useState(false);

    const [usernameValidation, setUsernameValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [err, setErr] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        if (/^[a-z0-9]+$/i.test(usernameInput)) {
            e.target[0].classList.remove("is-invalid")
            setUsernameValidation(false);
        } else {
            e.target[0].classList.add("is-invalid")
            setUsernameValidation(true);
        }
        if (/^[a-z0-9]+$/i.test(passwordInput)) {
            e.target[1].classList.remove("is-invalid")
            setPasswordValidation(false);
        } else {
            setPasswordValidation(true);
            e.target[1].classList.add("is-invalid")
        }
        if (e.target[0].classList.contains("is-invalid") ||
            e.target[1].classList.contains("is-invalid")
        ) {
            return;
        }

        const isValid = await checkValidUser(usernameInput);
        if (isValid) {
            setUser(usernameInput);
            if (staySignedIn) {
                const userObj = { user: usernameInput }
                localStorage.setItem("user", JSON.stringify(userObj))
            }
        } else {
            setErr("User not found")
        }
    }

    return (
        <>
            <Form className='account-login-form' onSubmit={handleSubmit}>
                <FloatingLabel
                    controlId="floatingUsername"
                    label="Username"
                    className="mb-3"
                >
                    <Form.Control type="text"
                        className="login-input username"
                        isInvalid={usernameValidation}
                        onChange={(e) => {
                            setErr(null);
                            setUsernameValidation(false);
                            setUsernameInput(e.target.value)
                        }}
                        placeholder="Username" />
                    <Form.Control.Feedback type="invalid">
                        Please enter a username.
                    </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingPassword"
                    label="Password">
                    <Form.Control
                        className="login-input password"
                        isInvalid={passwordValidation}
                        onChange={(e) => {
                            setErr(null);
                            setPasswordValidation(false)
                            setPasswordInput(e.target.value)
                        }}
                        type="password"
                        placeholder="Password" />
                    <Form.Control.Feedback type="invalid">
                        Please enter a password.
                    </Form.Control.Feedback>
                </FloatingLabel>
                <Form.Check className='stay-signed-in-switch'
                        type="switch"
                        id="stay-signed-in"
                        label="Stay signed in?"
                        bubble="false"
                        checked={staySignedIn}
                        onChange={() => setStaySignedIn(!staySignedIn)}
                    />
                <Button className="account-login-button" type="submit">Login</Button>
            </Form >
            {err && <ErrorMessage message="User not found" />}
        </>
    )
}