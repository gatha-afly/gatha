import { Outlet, Navigate } from "react-router-dom";
import useUserContext from "../context/useUserContext";

const ProtectedRoutes = () => {
  const { loggedIn } = useUserContext();

  return loggedIn ? <Outlet /> : <Navigate to="/user-login" />;
};

export default ProtectedRoutes;
