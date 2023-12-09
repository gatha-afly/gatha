import { useEffect, useState } from "react";
import { RiRadioButtonLine } from "react-icons/ri";
import styles from "./RenderMessages.module.css";
import { userAPI } from "./../../../../api/userAPI";
import { dateFormatter } from "./../../../../utils/dateUtils";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import UsernameInitials from "../../../common/UsernameInitials/UsernameInitials";
import ScrollContentToBottomContainer from "../../../common/ScrollContentToBottomContainer/ScrollContentToBottomContainer";
import IsTypingEffect from "../IsTypingEffect/IsTypingEffect";
import socket from "../../../../api/socket";
import useUpdateUserData from "../../../../hooks/useUpdateUser";
import Spinner from "../../../common/Spinner/Spinner";
import { devLog } from "../../../../utils/errorUtils";
import useUserContext from "../../../../hooks/useUserContext";
import OnlineStatusIndicator from "../OnlineStatusIndicator/OnlineStatusIndicator";
import DeleteMessage from "../DeleteMessage/DeleteMessage";

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

    // Define the fetchMessages function
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

    // Set up an interval to fetch messages every 60 seconds
    const intervalId = setInterval(fetchMessages, 60000);

    // Clear the interval and disconnect the socket when the component is unmounted
    return () => {
      clearInterval(intervalId);
      socket.disconnect();
    };
  }, [selectedGroup.groupId]);

  useEffect(() => {
    const handleNewMessage = ({ text: newMessage, groupId }) => {
      devLog("Received new message:", newMessage);
      devLog("Selected Group ID:", selectedGroup?.groupId);

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

    // Listen for initialization and new messages
    socket.on("init", handleNewMessage);
    socket.on("receive_message", handleNewMessage);
    socket.on("get_online_users", handleOnlineUsers);

    return () => {
      socket.off("init", handleNewMessage);
      socket.off("receive_message", handleNewMessage);
      socket.off("get_online_users", handleOnlineUsers);
    };
  }, [selectedGroup?.groupId]);

  return (
    <>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <>
          {error ? (
            <ErrorDisplay error={error} />
          ) : (
            <ScrollContentToBottomContainer>
              <ul className={styles.messagesContainer}>
                {messages.map((msg, index) => (
                  <li
                    key={index}
                    className={`${styles.message} ${
                      msg.sender?.id === user.userId
                        ? styles.senderMessage
                        : styles.receiverMessage
                    }`}>
                    <div className={styles.sender}>
                      <>
                        <UsernameInitials
                          firstName={msg.sender?.firstName}
                          lastName={msg.sender?.lastName}
                          radius={"2.6"}
                          fontSize={"1.1"}
                          borderWidth={"0.4"}
                        />
                        <span className={styles.sender}>
                          {msg.sender?.username}
                        </span>
                        {/*
  Render DeleteMessage if the sender is the current user
 and if the message has not been deleted.
*/}
                        {msg.sender?.id === user.userId && !msg.isDeleted && (
                          <DeleteMessage
                            senderId={user.userId}
                            messageId={msg._id}
                          />
                        )}

                        {/* Online and offline indicator */}
                        <div className={styles.onlineContainer}>
                          <OnlineStatusIndicator
                            isOnline={onlineUsers.includes(msg.sender?.id)}
                          />
                        </div>
                      </>
                    </div>
                    <div className={styles.message}>
                      {/*
    If message is deleted, display a notification.
    Otherwise, render the message text.
  */}
                      {msg.isDeleted ? (
                        <p className={styles.deletedMessage}>
                          This message has been deleted.
                        </p>
                      ) : (
                        <>{msg.text}</>
                      )}
                    </div>{" "}
                    <div className={styles.date}>
                      {dateFormatter(new Date(msg.createdAt))}
                    </div>
                  </li>
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
