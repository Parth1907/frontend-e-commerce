import React, { useState } from 'react'
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';
import userService from '../services/user';
import { Input, Button, Typography, Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export default function Register() {
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();
	const handleRegister = async (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			return toast.error("The password and confirm password doesnt match");
		}
		try {
			await userService.register({
				username, name, password
			});
			toast.success("Account created successfully");
			navigate("/")
		} catch (error) {			
			toast.error(`Error in making account, ${error.response.data.error}`)
			console.error("Error occured in making the user", error);
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
						Register
					</Typography>
				</CardHeader>
				<CardBody className="flex flex-col">
					<form onSubmit={handleRegister}>
						<div className="mb-2">
							<Input
								label='Name'
								type="text"
								value={name}
								name="username"
								onChange={({ target }) => setName(target.value)}
							/>
						</div>
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
						<div className="mb-2">
							<Input
								label='Confirm password'
								type="password"
								value={confirmPassword}
								name="password"
								onChange={({ target }) => setConfirmPassword(target.value)}
							/>
						</div>
						<Button
							variant="gradient"
							className="mb-4"
							type="submit"
							fullWidth
						>
							Sign up
						</Button>
					</form>
				</CardBody>
				<CardFooter className="pt-0">
					<div className="flex items-center font-roboto text-base justify-center">
						Already have an account?
						<Link to="/login">
							<p className="ml-1 font-bold font-roboto text-base text-blue-500 text-center">
								Login
							</p>
						</Link>
					</div>
				</CardFooter>
			</Card>

		</div>

	)
}
