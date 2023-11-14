import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserContext from "../../../context/useUserContext";

const UserLogout = () => {
  const navigate = useNavigate();
  const { logoutUser } = useUserContext();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logoutUser();
        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    handleLogout();
  }, [navigate, logoutUser]);

  return null;
};

export default UserLogout;
