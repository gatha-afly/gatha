import { useContext } from "react";
import chatContext from "./chatContext";

function useChatContext() {
  return useContext(chatContext);
}

export default useChatContext;
