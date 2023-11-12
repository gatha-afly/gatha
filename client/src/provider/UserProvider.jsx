import { useState } from "react";
import PropTypes from "prop-types";
import userContext from "../context/userContext";
const UserProvider = ({ children }) => {
  const [error, setError] = useState("");

  return (
    <userContext.Provider value={{ error, setError }}>
      {children}
    </userContext.Provider>
  );
};

//Validates props
UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export default UserProvider;
