import React, { useEffect, useState } from "react";
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

  // Update user data on mount
  useEffect(() => {
    fetchUserUpdates();
  }, [fetchUserUpdates]);

  useEffect(() => {
    //Connect the socket
    socket.connect();

    // Fetch the messages when on mount
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

    // Call fetchMessages function to initiate the data fetching
    fetchMessages();
  }, [selectedGroup.groupId]);

  useEffect(() => {
    const handleNewMessage = ({ text: newMessage, groupId }) => {
      console.log("Received new message:", newMessage);
      console.log("Selected Group ID:", selectedGroup?.groupId);

      if (groupId === selectedGroup?.groupId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    //Handler for getting online users from socket server
    const handleOnlineUsers = ({ onlineUsers, groupId }) => {
      if (groupId === selectedGroup?.groupId) {
        setOnlineUsers(onlineUsers);
      }

      console.log("Online user event recieved", onlineUsers);
    };

    // Listen for initialization and new messages
    socket.on("init", handleNewMessage);
    socket.on("receive_message", handleNewMessage);
    socket.on("get_online_users", handleOnlineUsers);

    return () => {
      socket.off("init", handleNewMessage);
      socket.off("receive_message", handleNewMessage);
      socket.off("get_online_users", handleOnlineUsers);

      //Disconnect the socket
      socket.disconnect();
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
                    }`}
                  >
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

                        {/* Online and offline indicator */}
                        <div className={styles.onlineContainer}>
                          {msg.sender.id}
                          {onlineUsers.includes(msg.sender.id) ? (
                            <div className={styles.online}>
                              <span>Online</span>
                              <RiRadioButtonLine
                                className={styles.onlineIcon}
                              />
                            </div>
                          ) : (
                            <div className={styles.offline}>
                              <span>Offline</span>
                              <RiRadioButtonLine
                                className={styles.offlineIcon}
                              />
                            </div>
                          )}
                        </div>
                      </>
                    </div>
                    <div className={styles.message}>{msg.text}</div>
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
