import { useState, useEffect } from "react";
import { userAPI } from "../api/userAPI";
import socket from "../api/socket";
import { devLog, handleServerErrors } from "../utils/errorUtils";
import UserContext from "../context/userContext";
/**
 * UserProvider component that manages user authentication context, providing necessary state variables and functions for user authentication and socket connection.
 *
 * @param {Object} children - The React components rendered within the UserProvider.
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
   * Updates the 'loggedIn' state in the user context.   *
   * @param {boolean} value - The new value for the 'loggedIn' state.
   * @returns {void}
   */
  const handleLoggedInChange = (value) => {
    setLoggedIn(value);
  };

  /**
   * Manages socket connection and disconnection based on user authentication status, connects sockets
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
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      devLog(`Errors found`);
      devLog(error.response);
      setLoggedIn(false);
      handleServerErrors(error, setError);

      // Handle different error scenarios
      if (error.response && error.response.status === 401) {
        setError("Invalid credentials.");
      } else if (error.response && error.response.status === 403) {
        setError("You don't have permission to log in.");
      } else {
        setError("An unknown error occurred. Please try again later.");
      }
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
    } catch (err) {
      setError("An error occurred while logging out.");
      console.error(err.message);
    }
  };
  /**
   * Updates user data in context and localStorage
   * @param {Object} newUserData - The updated user data
   */
  const updateUser = (newUserData) => {
    // Use the functional form of setUser to ensure the latest state value
    setUser((prevUser) => {
      // Merge the newUserData with the existing user data
      const updatedUser = newUserData ? { ...prevUser, ...newUserData } : null;
      // Update the user data in localStorage
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
  /**
   * Updates selectedGroup and deletes it from local storage
   * @param {*} newSelectedGroup
   */
  const deleteSelectedGroup = () => {
    setSelectedGroup(null);
    localStorage.removeItem("selectedGroup");
  };

  // Provide user context to component tree
  return (
    <UserContext.Provider
      value={{
        error,
        setError,
        loggedIn,
        loginUser,
        user,
        logoutUser,
        updateUser,
        selectedGroup,
        updateSelectedGroup,
        deleteSelectedGroup,
        isTyping,
        setIsTyping,
        typingUser,
        setTypingUser,
        handleLoggedInChange,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
