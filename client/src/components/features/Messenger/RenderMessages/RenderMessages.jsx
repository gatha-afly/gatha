import { useEffect, useState } from "react";
import styles from "./RenderMessages.module.css";
import userAPI from "./../../../../api/userAPI";
import { dateFormatter } from "./../../../../utils/dateUtils";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import UsernameInitials from "../../../common/UsernameInitials/UsernameInitials";
import useUserContext from "../../../../context/useUserContext";
import ScrollContentToBottomContainer from "../../../common/ScrollContentToBottomContainer/ScrollContentToBottomContainer";

/**
 * Renders group messages of the selected group.
 * @param {Object} props - The component props.
 * @param {Object} props.selectedGroup - The group currently selected by the user.
 * @param {Object} props.socket - The socket for real-time communication.
 * @returns {JSX.Element} - The rendered component.
 */
function RenderMessages({ selectedGroup, socket }) {
  // Retrieve user information
  const { user } = useUserContext();

  // Set state for messages and errors
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the messages of the selected group
    const fetchMessages = async () => {
      try {
        const response = await userAPI.get(
          `/messages/${selectedGroup.groupId}`
        );
        // Update message state with the retrieved messages
        setMessages(response.data);
      } catch (error) {
        // Handle errors by updating the error state
        setError("An error occurred while fetching the group messages.");
      }
    };
    // Call fetchMessages function to initiate the data fetching
    fetchMessages();

    // Listen for initialization event from the server
    socket.on("init", (loadedMessages) => {
      // Update state with loaded messages
      setMessages(loadedMessages);
    });

    // Listen for new messages from the server
    socket.on("receive_message", ({ text: newMessage, groupId }) => {
      // Check if the message belongs to the selected group
      if (groupId.toString() === selectedGroup?.groupId.toString()) {
        // Update state by adding new messages to previous ones
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
    <>
      {/* Render error if there's an error */}
      {error ? (
        <ErrorDisplay error={error} />
      ) : (
        <ScrollContentToBottomContainer>
          {/* Scroll to the bottom of the container to render the latest message, apply dynamic classes based on whether message is sent or received by logged in user. Render message author initials and username */}
          <ul className={styles.messagesContainer}>
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`${styles.message} ${
                  msg.sender._id === user.userId
                    ? styles.senderMessage
                    : styles.receiverMessage
                }`}>
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
                {/* Render message text */}
                <div className={styles.message}>{msg.text}</div>
                {/* Render message date */}
                <div className={styles.date}>
                  {dateFormatter(new Date(msg.createdAt))}
                </div>
              </li>
            ))}
          </ul>
        </ScrollContentToBottomContainer>
      )}
    </>
  );
}
export default RenderMessages;
