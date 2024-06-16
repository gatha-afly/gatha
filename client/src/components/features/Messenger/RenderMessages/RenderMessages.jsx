import { useEffect, useState } from "react";
import styles from "./RenderMessages.module.css";
import { userAPI } from "@api/userAPI";
import ErrorDisplay from "@common/ErrorDisplay/ErrorDisplay";
import ScrollContentToBottomContainer from "@common/ScrollContentToBottomContainer/ScrollContentToBottomContainer";
import IsTypingEffect from "../IsTypingEffect/IsTypingEffect";
import socket from "@api/socket";
import useUpdateUserData from "@hooks/useUpdateUser";
import Spinner from "@common/Spinner/Spinner";
import { devLog } from "@utils/errorUtils";
import useUserContext from "@hooks/useUserContext";
import MessageItem from "../MessageItem/MessageItem";

/**
 * Component for rendering chat messages.
 * @component
 * @param {Object} selectedGroup - The selected group information.
 * @returns {JSX.Element} - The rendered component.
 */
function RenderMessages({ selectedGroup }) {
  // Get user from context
  const { user } = useUserContext();
  // Manage state for group chat messages, loading and errors
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Get user updates and fetch error from custom hook
  const { fetchUserUpdates } = useUpdateUserData();

  devLog("Online Users:", onlineUsers);
  devLog("Messages:", messages);

  // Update user data on mount
  useEffect(() => {
    fetchUserUpdates();
  }, [fetchUserUpdates]);

  useEffect(() => {
    // Connect to the socket
    socket.connect();

    // fetchMessages from server
    const fetchMessages = async () => {
      try {
        const response = await userAPI.get(
          `/messages/${selectedGroup.groupId}`
        );
        setMessages(response.data);
        devLog(response.data);
        setIsLoading(false);
      } catch (error) {
        devLog(error);
        setError("An error occurred while fetching the group messages.");
        setIsLoading(false);
      }
    };

    // Fetch the messages initially when the component mounts
    fetchMessages();

    // Set up an interval to fetch messages every 60 seconds (mainly to re-rerender deleted messages)
    const intervalId = setInterval(fetchMessages, 60000);

    // Clear the interval and disconnect the socket when the component is unmounted
    return () => {
      clearInterval(intervalId);
      socket.disconnect();
    };
  }, [selectedGroup.groupId]);

  useEffect(() => {
    // Handler for receiving new messages from the socket
    const handleNewMessage = ({ text: newMessage, groupId }) => {
      devLog("Received new message:", newMessage);
      devLog("Selected Group ID:", selectedGroup?.groupId);
      // Check if the received message belongs to the currently selected group
      if (groupId === selectedGroup?.groupId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    //Handler for getting online users from socket server
    const handleOnlineUsers = ({ onlineUsers, groupId }) => {
      if (groupId === selectedGroup?.groupId) {
        setOnlineUsers(onlineUsers);
      }

      devLog("Online user event received", onlineUsers);
    };

    // Listen for initialization, new messages and online users
    socket.on("init", handleNewMessage);
    socket.on("receive_message", handleNewMessage);
    socket.on("get_online_users", handleOnlineUsers);

    // Clean up by removing the handlers when the component is unmounted
    return () => {
      socket.off("init", handleNewMessage);
      socket.off("receive_message", handleNewMessage);
      socket.off("get_online_users", handleOnlineUsers);
    };
  }, [selectedGroup?.groupId]);

  return (
    // Render spinner while messages are fetched from the database
    <>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        // Render messages or error display once loading is complete
        <>
          {error ? (
            <ErrorDisplay error={error} />
          ) : (
            // Always render latest message
            <ScrollContentToBottomContainer>
              <ul className={styles.messagesContainer}>
                {messages.map((msg) => (
                  <MessageItem
                    key={msg._id}
                    msg={msg}
                    user={user}
                    onlineUsers={onlineUsers}
                  />
                ))}
                <IsTypingEffect />
              </ul>
            </ScrollContentToBottomContainer>
          )}
        </>
      )}
    </>
  );
}

export default RenderMessages;
