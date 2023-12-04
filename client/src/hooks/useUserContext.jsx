import { useContext } from "react";
import UserContext from "../context/userContext";

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export default useUserContext;
