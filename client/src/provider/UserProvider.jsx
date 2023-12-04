import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import userContext from "../context/userContext";
import userAPI from "../api/userAPI";
import socket from "../api/socket";

/**
 * UserProvider component that providing user authentication context.
 */
const UserProvider = ({ children }) => {
  // Retrieve user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedSelectedGroup = JSON.parse(localStorage.getItem("selectedGroup"));

  // State variables for user authentication
  const [loggedIn, setLoggedIn] = useState(!!storedUser);
  const [user, setUser] = useState(storedUser);
  const [error, setError] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(storedSelectedGroup);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");

  /**
   * useEffect connection and disconnected depending on userLogins
   */
  useEffect(() => {
    if (loggedIn) {
      //Connect the socket after login
      socket.connect();
    } else {
      //Disconnect the socket after logout
      socket.disconnect();
    }
  }, [loggedIn]);

  /**
   * Handles user login.
   * @param {Object} data - The user login data.
   * @returns {Promise<void>} - A promise that resolves after login.
   */
  const loginUser = async (data) => {
    try {
      setError(""); // Clears the error
      // Send login request to the server
      const response = await userAPI.post("/users/login", data);

      // Extract user data from response
      const userData = response.data.user;

      // Update state and localStorage on successful login
      setUser(userData);
      setLoggedIn(true);

      //Store the user data on localstorage
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.log("errors found");
      setLoggedIn(false);
      console.log(err.response.status);

      // Handle different error scenarios
      if (err.response && err.response.status === 401) {
        setError("Incorrect password.");
      } else if (err.response && err.response.status === 403) {
        setError("You don't have permission to log in.");
      } else if (err.response && err.response.status === 404) {
        setError("Email address not found. Please register an account.");
      } else {
        setError("An unknown error occurred. Please try again later.");
      }

      // Reject the promise with the error
      return Promise.reject(err);
    }
  };

  /**
   * Handles user logout.
   * @returns {Promise<void>} - A promise that resolves after logout.
   */
  const logoutUser = async () => {
    try {
      // Perform logout API call
      await userAPI.get("/users/logout");

      // Update state and remove user data from localStorage after logout
      setLoggedIn(false);

      localStorage.removeItem("user");
      localStorage.removeItem("selectedGroup");
      localStorage.removeItem("socket");
    } catch (err) {
      setError("An error occurred while logging out.");
      console.error(err.message);
    }
  };

  /**
   * Updates user data and localStorage
   * @param {*} newUserData
   */
  const getDataFromHookAndUpdateUser = (newUserData) => {
    // Use the functional form of setUser to ensure the latest state value
    setUser((prevUser) => {
      const updatedUser = newUserData ? { ...prevUser, ...newUserData } : null;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  /**
   * Updates selectedGroup and stores it in local storage
   * @param {*} newSelectedGroup
   */
  const updateSelectedGroup = (groupData) => {
    setSelectedGroup(groupData);
    localStorage.setItem("selectedGroup", JSON.stringify(groupData));
  };

  // Provide user context to component tree
  return (
    <userContext.Provider
      value={{
        error,
        setError,
        loggedIn,
        loginUser,
        user,
        logoutUser,
        getDataFromHookAndUpdateUser,
        selectedGroup,
        updateSelectedGroup,
        isTyping,
        setIsTyping,
        typingUser,
        setTypingUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

// Prop types validation
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UserProvider;
