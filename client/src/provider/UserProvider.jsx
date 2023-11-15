import { useState } from "react";
import PropTypes from "prop-types";
import userContext from "../context/userContext";
import userAPI from "../api/userAPI";

const UserProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [loggedIn, setLoggedIn] = useState(!!storedUser);
  const [user, setUser] = useState(storedUser);
  const [error, setError] = useState("");

  /**
   * Handler for login user
   * @param {*} data
   * @returns
   */
  const loginUser = async (data) => {
    try {
      setError(""); //Clears the error
      const response = await userAPI.post("/users/login", data);

      const userData = response.data.user;

      setUser(userData);
      setLoggedIn(true);

      // Store the user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("no errors found");
      console.log(user);
    } catch (err) {
      console.log("errors found");
      setLoggedIn(false);
      console.log(err.response.status);

      if (err.response && err.response.status === 401) {
        setError("Your password is incorrect");
      } else if (err.response && err.response.status === 403) {
        setError("You don't have permission to log in");
      } else if (err.response && err.response.status === 404) {
        setError("User not found. please register an account");
      } else {
        setError("An unknown error occurred while logging in");
      }

      return Promise.reject(err);
    }
  };

  /**
   * Handler for user logout
   */
  const logoutUser = async () => {
    try {
      await userAPI.get("/users/logout");
      setLoggedIn(false);

      //Remove user data from localStorage after logout
      localStorage.removeItem("user");
    } catch (err) {
      setError("An error occurred while logging out.");
      console.error(err.message);
    }
  };

  return (
    <userContext.Provider
      value={{ error, setError, loggedIn, loginUser, user, logoutUser }}
    >
      {children}
    </userContext.Provider>
  );
};

//Validates props
UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export default UserProvider;
