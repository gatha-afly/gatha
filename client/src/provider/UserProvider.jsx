import { useState } from "react";
import PropTypes from "prop-types";
import userContext from "../context/userContext";
import userAPI from "../api/userAPI";

const UserProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [loggedIn, setLoggedIn] = useState(!!storedUser);
  const [user, setUser] = useState(storedUser);
  const [error, setError] = useState("");

  const loginUser = async (data) => {
    try {
      setError("");
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
        setError("Either your email or password is incorrect");
      } else if (err.response && err.response.status === 403) {
        setError("You don't have permission to log in");
      } else {
        setError("An unknown error occurred while logging in");
      }

      return Promise.reject(err);
    }
  };

  return (
    <userContext.Provider
      value={{ error, setError, loggedIn, loginUser, user }}
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
