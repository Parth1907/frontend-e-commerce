import React, { useContext, useState } from 'react'
import loginService from "../services/login"
import { toast } from "react-toastify"
import { AuthContext } from "../context/AuthProvider"
import { useNavigate } from 'react-router-dom';
import { Input, Button, Typography, Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            });
            login(user)
            toast.success("Logged in successfully");
            navigate("/")
        } catch (error) {
            toast.error(`Wrong Credentials, ${error.response.data.error}`)
            console.error("Error occured in getting the user", error);
        }
    }

    return (
        <div className='grid grid-cols-1 h-screen justify-items-center items-center'>
            <Card className="w-96">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Login
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col">
                    <form onSubmit={handleLogin}>
                        <div className="mb-2">
                            <Input
                                label='Username'
                                type="text"
                                value={username}
                                name="username"
                                onChange={({ target }) => setUsername(target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <Input
                                label='Password'
                                type="password"
                                value={password}
                                name="password"
                                onChange={({ target }) => setPassword(target.value)}
                            />
                        </div>
                        <Button
                            variant="gradient"
                            className="mb-4"
                            type="submit"
                            fullWidth
                        >
                            Login
                        </Button>
                    </form>
                </CardBody>
                <CardFooter className="pt-0">
                    <div className="flex items-center font-roboto text-base justify-center">
                        Dont have an account?
                        <Link to="/register">
                            <p className="ml-1 font-bold font-roboto text-base text-blue-500 text-center">
                                Register
                            </p>
                        </Link>
                    </div>
                </CardFooter>
            </Card>

        </div>
    )
}
