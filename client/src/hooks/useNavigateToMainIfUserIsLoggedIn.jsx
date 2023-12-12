import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "./useUserContext";
/**
 * Custom hook that navigates to the main page if the user is already logged in.
 * @returns {boolean} - Indicates whether the check is complete.
 */
const useNavigateToMainIfUserIsLoggedIn = () => {
  // Get loggedIn status from userContext
  const { loggedIn } = useUserContext();
  // Navigation hook for redirecting
  const navigate = useNavigate();
  // Set checkComplete state
  const [checkComplete, setCheckComplete] = useState(false);

  useEffect(() => {
    // Check if the user is logged in and navigate to the main page
    if (loggedIn) {
      navigate("/main");
      setCheckComplete(true);
    } else {
      setCheckComplete(true);
    }
  }, [loggedIn, navigate]);

  return checkComplete;
};

export default useNavigateToMainIfUserIsLoggedIn;
