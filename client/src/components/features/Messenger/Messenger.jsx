import "./Messenger.module.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import useUserContext from "../../../context/useUserContext";
import userAPI from "../../../api/userAPI";
import styles from "./Messenger.module.css";
import { dateFormatter } from "../../../utils/dateUtils";

const socket = io.connect("http://localhost:3001", {
  withCredentials: true,
});

function Messenger() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { selectedGroup } = useUserContext();
  const [error, setError] = useState("");

  useEffect(() => {
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
    socket.on("init", (loadedMessages) => {
      setMessages(loadedMessages);
    });

    socket.on("receive_message", ({ text: newMessage, groupId }) => {
      if (groupId.toString() === selectedGroup.groupId.toString()) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    socket.on("error", ({ message }) => {
      setError(message);
    });

    return () => socket.off();
  }, [selectedGroup.groupId]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("send_message", {
        text: input,
        groupId: selectedGroup.groupId,
      });

      setInput("");
      setError("");
    }
  };

  return (
    <div className={styles.messageContainer}>
      <h2>Welcome to, {selectedGroup.name} group</h2>
      <input
        placeholder='Message...'
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
