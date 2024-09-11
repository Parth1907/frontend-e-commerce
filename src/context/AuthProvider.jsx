import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const getJWTFromCookie = () => {
		const cookieString = document.cookie.split("; ").find(row => row.startsWith("jwt="));
		return cookieString ? cookieString.split("=")[1] : null
	}

	const [user, setUser] = useState(() => {
		const loggedUserJSON = localStorage.getItem("user");
		return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
	});

	const login = (userData) => {
		setUser(userData);
		window.localStorage.setItem("user", JSON.stringify(userData));
	};
	const logout = () => {
		setUser(null);
		window.localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, getJWTFromCookie }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
