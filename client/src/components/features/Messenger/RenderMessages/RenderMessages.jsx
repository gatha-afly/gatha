import { useEffect, useState } from "react";
import styles from "./RenderMessages.module.css";
import userAPI from "./../../../../api/userAPI";
import { dateFormatter } from "./../../../../utils/dateUtils";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import UsernameInitials from "../../../common/UsernameInitials/UsernameInitials";
import useUserContext from "../../../../context/useUserContext";

function RenderMessages({ selectedGroup, socket }) {
  // Retrieve user information
  const { user } = useUserContext();

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    //Fetch the  messages of the selected group
    const fetchMessages = async () => {
      try {
        const response = await userAPI.get(
          `/messages/${selectedGroup.groupId}`
        );
        setMessages(response.data);
      } catch (error) {
        setError("An error occurred while fetching the group messages.");
      }
    };
    fetchMessages();

    // Listen for initialization event from the server
    socket.on("init", (loadedMessages) => {
      // Update state with loaded messages
      setMessages(loadedMessages);
    });

    // Listen for new messages from the server
    socket.on("receive_message", ({ text: newMessage, groupId }) => {
      // Check if the message belongs to selected group
      if (groupId.toString() === selectedGroup?.groupId.toString()) {
        // Update state with the new message
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    // Listen for error events from the server
    socket.on("error", ({ message }) => {
      // Set error state with the received error message
      setError(message);
    });

    // Cleanup function to remove socket event listeners when the component unmount
    return () => socket.off();
  }, [selectedGroup.groupId, socket]);

  return (
    <div>
      {/*If error, render error */}
      {error ? (
        <ErrorDisplay error={error} />
      ) : (
        <ul className={styles.messagesContainer}>
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`${styles.message} ${
                msg.sender._id === user.userId
                  ? styles.senderMessage
                  : styles.receiverMessage
              }`}
            >
              <div className={styles.sender}>
                <UsernameInitials
                  firstName={msg.sender.firstName}
                  lastName={msg.sender.lastName}
                  radius={"2.6"}
                  fontSize={"1.1"}
                  borderWidth={"0.4"}
                />
                <span className={styles.sender}>{msg.sender.username}</span>
              </div>
              <div className={styles.message}>{msg.text}</div>
              <div className={styles.date}>
                {dateFormatter(new Date(msg.createdAt))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RenderMessages;
