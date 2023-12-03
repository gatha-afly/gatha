import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import PropTypes from "prop-types";
import userContext from "../context/userContext";
import userAPI from "../api/userAPI";

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
  const [isUserOnline, setIsUserOnline] = useState(false);
  const [socket, setSocket] = useState(null);

  // Function to connect the socket
  const connectSocket = useCallback(() => {
    const socketUrl = import.meta.env.VITE_REACT_APP_SOCKET_URL;
    const newSocket = io.connect(socketUrl, {
      withCredentials: true,
    });

    if (loggedIn) {
      setSocket(newSocket);
    }

    // Cleanup socket on component unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [loggedIn]);

  // Connecting to the socket.io server on component mount
  useEffect(() => {
    const cleanupSocket = connectSocket();
    return cleanupSocket;
  }, [connectSocket]); // Dependency array includes the connectSocket function

  /**
   * Handler for fetching online users
   * @param {*} userId
   * @returns
   */
  const fetchOnlineUsers = async (userId) => {
    try {
      if (loggedIn) {
        const response = await userAPI.get(`/users/online/${userId}`);
        console.log(response.data.status);
        setIsUserOnline(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("User not found.");
        // Handle the 404 error gracefully (e.g., show a message to the user).
        return null; // Return null or any other value as needed.
      } else {
        console.log("An error occurred:", error.message);
        return null;
      }
    }
  };

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
    } catch (err) {
      setError("An error occurred while logging out.");
      console.error(err.message);
    }
  };

  /**
   * Updates user data and localStorage
   * @param {*} newUserData
   */
  const updateUserData = (newUserData) => {
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
        updateUserData,
        selectedGroup,
        updateSelectedGroup,
        isTyping,
        setIsTyping,
        typingUser,
        setTypingUser,
        fetchOnlineUsers,
        isUserOnline,
        socket,
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
