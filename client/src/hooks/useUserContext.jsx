import { useContext } from "react";
import UserContext from "../context/userContext";

/**
 * Custom hook to access the UserContext.
 *
 * @returns {Object} The UserContext object.
 * @throws Will throw an error if used outside of a UserProvider.
 */
const useUserContext = () => {
  // Access the UserContext
  const context = useContext(UserContext);

  // Throw an error if used outside of a UserProvider
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export default useUserContext;
