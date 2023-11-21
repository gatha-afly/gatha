import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../../context/userContext";
import useUserContext from "../../../context/useUserContext";

/**
 * Component that navigates to the main page if the user is already logged in.
 * @returns {null} - This component doesn't render anything.
 */
const NavigateToMainIfUserIsLoggedIn = () => {
  // Get loggedIn status from userContext
  const { loggedIn } = useUserContext(userContext);

  // Navigation hook for redirecting
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in and navigate to main page
    if (loggedIn) {
      navigate("/main");
    }
  }, [loggedIn, navigate]);

  return null;
};

export default NavigateToMainIfUserIsLoggedIn;
