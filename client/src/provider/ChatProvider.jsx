import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import chatContext from "../context/chatContext";
import useUserContext from "../context/useUserContext";
import userAPI from "../api/userAPI";

const ChatProvider = ({ children }) => {
  const { user } = useUserContext();
  const [userChat, setUserChat] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        const response = await userAPI.get(`/chats/${user?._id}`);
      }
    };

    getUserChats();
  }, [user]);

  return (
    <chatContext.Provider value={{ userChat, setUserChat }}>
      {children}
    </chatContext.Provider>
  );
};

// Prop types validation
ChatProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ChatProvider;
