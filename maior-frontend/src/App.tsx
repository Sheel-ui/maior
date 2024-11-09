import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import AuthHandler from "./middleware/authHandler";

interface PrivateRouteProps {
	element: JSX.Element;
}

export default function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const PrivateRoute = ({ element }: PrivateRouteProps) => {
		return isAuthenticated ? element : <Navigate to="/login" />;
	};

	return (
		<div className="max-h-screen overflow-hidden">
			<Router>
				<AuthHandler setIsAuthenticated={setIsAuthenticated} />
				<Routes>
					<Route path="/" element={<Navigate to="/login" />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/dashboard"
						element={<PrivateRoute element={<Dashboard />} />}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
}
