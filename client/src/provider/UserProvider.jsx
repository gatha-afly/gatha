import { useState } from "react";
import PropTypes from "prop-types";
import userContext from "../context/userContext";
import userAPI from "../api/userAPI";

const UserProvider = ({ children }) => {
  const [error, setError] = useState("");

  const registerUser = async (data) => {
    try {
      //Empty the error state
      setError("");

      const response = await userAPI.post("/users/register", data);
      console.log(response);
    } catch (err) {
      console.log(err.response.status);
    }
  };
  return (
    <userContext.Provider value={{ error, setError, registerUser }}>
      {children}
    </userContext.Provider>
  );
};

//Validates props
UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export default UserProvider;
