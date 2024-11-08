import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthHandlerProps {
	setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthHandler: React.FC<AuthHandlerProps> = ({ setIsAuthenticated }) => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setIsAuthenticated(true);
			if (
				location.pathname === "/" ||
				location.pathname === "/login" ||
				location.pathname === "/signup"
			) {
				navigate("/dashboard", { replace: false });
			}
		}
	}, [location, navigate, setIsAuthenticated]);

	return null;
};

export default AuthHandler;
