import { Navigate, useRoutes } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";

interface AppRouterProps {
  isAuthenticated: boolean;
}

const ProtectedRoute = ({ element, isAuthenticated }: { element: JSX.Element, isAuthenticated: boolean }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRouter = ({ isAuthenticated }: AppRouterProps) => {
  const elements = useRoutes([
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return elements;
};

export default AppRouter;
