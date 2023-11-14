import { useContext } from "react";
import userContext from "./userContext";

function useUserContext() {
  return useContext(userContext);
}

export default useUserContext;
