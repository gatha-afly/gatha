import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserContext from "../../../hooks/useUserContext";
import { devLog } from "../../../utils/errorUtils";

/**
 * Functional component for handling user logout.
 * Attempts to logout the user and navigates to the home page on success,
 * Logs error if logout fails.
 *
 */
const UserLogout = () => {
  const navigate = useNavigate();
  const { logoutUser } = useUserContext();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logoutUser();
        navigate("/user-login");
      } catch (error) {
        devLog("Logout failed:", error);
      }
    };

    handleLogout();
  }, [navigate, logoutUser]);

  return null;
};

export default UserLogout;
