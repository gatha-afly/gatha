import "./Messenger.module.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import useUserContext from "../../../context/useUserContext";
import userAPI from "../../../api/userAPI";
import styles from "./Messenger.module.css";
import { dateFormatter } from "../../../utils/dateUtils";

//Connecting to the socket.io server
const socketUrl = import.meta.env.VITE_REACT_APP_SOCKET_URL;
const socket = io.connect(socketUrl, {
  withCredentials: true,
});

function Messenger() {
  // State hooks for managing messages, user input, selected group, and errors
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { selectedGroup } = useUserContext();
  const [error, setError] = useState("");

  useEffect(() => {
    //Fetches the  messages based on provided groupId
    const fetchMessages = async () => {
      try {
        const response = await userAPI.get(
          `/messages/${selectedGroup.groupId}`
        );
        setMessages(response.data);
      } catch (error) {
        setError("Error occurred while fetching the group chat");
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
      // Check if the message belongs to the currently selected group
      if (groupId.toString() === selectedGroup.groupId.toString()) {
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
  }, [selectedGroup.groupId]);

  const sendMessage = () => {
    if (input.trim()) {
      // Emit a "send_message" event to the server with the message text and group ID
      socket.emit("send_message", {
        text: input,
        groupId: selectedGroup.groupId,
      });

      // Clear the input field and reset the error stat
      setInput("");
      setError("");
    }
  };

  return (
    <div className={styles.messageContainer}>
      <h2>Welcome to, {selectedGroup.name} group</h2>
      <input
        placeholder="Message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send Message</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h1>Messages:</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index} className={styles.messages}>
            {msg.text} - {dateFormatter(new Date(msg.createdAt))}
            {msg.sender?.username && (
              <span> - Sent by: {msg.sender.username}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messenger;
