import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import AppRouter from "./Router";
import AuthHandler from "./middleware/authHandler";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="max-h-screen overflow-hidden">
      <Router future={{ v7_startTransition: true }}>
        <AuthHandler setIsAuthenticated={setIsAuthenticated} />
        <AppRouter isAuthenticated={isAuthenticated} />
      </Router>
    </div>
  );
}
