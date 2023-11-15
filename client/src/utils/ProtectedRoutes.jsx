import { Outlet, Navigate } from "react-router-dom";
import useUserContext from "../context/useUserContext";

/**
 * Component for handling protected routes.
 * If user is logged in, it renders the nested routes (Outlet),
 * navigates to user login page.
 */
const ProtectedRoutes = () => {
  // Access the loggedIn state from the user context
  const { loggedIn } = useUserContext();

  return loggedIn ? <Outlet /> : <Navigate to='/user-login' />;
};

export default ProtectedRoutes;
