import styles from "./Messenger.module.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import useUserContext from "../../../context/useUserContext";
import { dateFormatter } from "../../../utils/dateUtils";

// Establish a socket connection to the server
const socket = io.connect("http://localhost:3001", {
  withCredentials: true,
});

function Messenger() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { selectedGroup } = useUserContext();

  useEffect(() => {
    // Event listener for initial messages
    socket.on("init", (loadedMessages) => {
      setMessages(loadedMessages);
    });

    // Event listener for new messages
    socket.on("receive_message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up socket connection when the component unmounts
    return () => socket.off();
  }, []);

  // Function to send a new message
  const sendMessage = () => {
    if (input.trim()) {
      // Emit a message event with the text and sender ID
      socket.emit("send_message", { text: input });
      setInput(""); // Clear the input field after sending the message
    }
  };

  return (
    <div className={styles.messageContainer}>
      <h2>{selectedGroup.name} group</h2>
      <h3>Messages:</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index} className={styles.messages}>
            <div className={styles.sender}>{msg.sender.username}</div>
            <div className={styles.text}>
              {msg.text}{" "}
              <div className={styles.date}>
                {dateFormatter(new Date(msg.createdAt))}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <input
        placeholder='Message...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>send</button>
    </div>
  );
}

export default Messenger;
