import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthProvider";
import {Typography, Button} from "@material-tailwind/react";
export default function Navbar() {
	const {user, logout} = useContext(AuthContext);

	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};
	return (
		<div className="container mx-auto flex justify-between items-center p-4">
			<Typography variant="h5" className="text-blue-500">
				<Link to={`/`}>E-commerce</Link>
			</Typography>
			<div className="flex items-center space-x-4">
				<Link to="/checkout">
					<Typography variant="h6">Checkout</Typography>
				</Link>
				{user ? (
					<>
						<Typography variant="h6">{`${user.name}`}</Typography>
						<Button color="blue" onClick={handleLogout}>
							Logout
						</Button>
					</>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/register">Create Account</Link>
					</>
				)}
			</div>
		</div>
	);
}
