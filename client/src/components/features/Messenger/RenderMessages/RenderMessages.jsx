import { useEffect, useState } from "react";
import styles from "./RenderMessages.module.css";
import userAPI from "./../../../../api/userAPI";
import { dateFormatter } from "./../../../../utils/dateUtils";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import UsernameInitials from "../../../common/UsernameInitials/UsernameInitials";
import useUserContext from "../../../../context/useUserContext";
import ScrollContentToBottomContainer from "../../../common/ScrollContentToBottomContainer/ScrollContentToBottomContainer";
import IsTypingEffect from "../IsTypingEffect/IsTypingEffect";
import socket from "../../../../api/socket";

function RenderMessages({ selectedGroup }) {
  const { user } = useUserContext();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the initial messages when the component mounts
    const fetchMessages = async () => {
      try {
        const response = await userAPI.get(
          `/messages/${selectedGroup.groupId}`
        );
        setMessages(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setError("An error occurred while fetching the group messages.");
      }
    };

    // Call fetchMessages function to initiate the data fetching
    fetchMessages();

    // Listen for new messages from the server
    const handleNewMessage = ({ text: newMessage, groupId }) => {
      if (groupId === selectedGroup?.groupId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    // Listen for initialization and new messages
    socket.on("init", handleNewMessage);
    socket.on("receive_message", handleNewMessage);

    // Listen for error events from the server
    socket.on("error", ({ message }) => {
      setError(message);
    });

    // Cleanup function to remove socket event listeners when the component unmounts
    return () => {
      socket.off("init", handleNewMessage);
      socket.off("receive_message", handleNewMessage);
      socket.off("error");
    };
  }, [selectedGroup.groupId]);

  return (
    <>
      {error ? (
        <ErrorDisplay error={error} />
      ) : (
        <ScrollContentToBottomContainer>
          <ul className={styles.messagesContainer}>
            {messages.map(
              (msg, index) =>
                // prevent display old messages for newly joined users
                msg.sender && (
                  <li
                    key={index}
                    className={`${styles.message} ${
                      msg.sender._id === user.userId
                        ? styles.senderMessage
                        : styles.receiverMessage
                    }`}
                  >
                    <div className={styles.sender}>
                      <>
                        <UsernameInitials
                          firstName={msg.sender.firstName}
                          lastName={msg.sender.lastName}
                          radius={"2.6"}
                          fontSize={"1.1"}
                          borderWidth={"0.4"}
                        />
                        <span className={styles.sender}>
                          {msg.sender.username}
                        </span>
                      </>
                    </div>
                    <div className={styles.message}>{msg.text}</div>
                    <div className={styles.date}>
                      {dateFormatter(new Date(msg.createdAt))}
                    </div>
                  </li>
                )
            )}
            <IsTypingEffect />
          </ul>
        </ScrollContentToBottomContainer>
      )}
    </>
  );
}

export default RenderMessages;
