// Message.js
import "./message.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import useDateFormatter from "../../../hooks/useDateFormatter";
import useUserContext from "../../../context/useUserContext";

const socket = io.connect("http://localhost:3001", {
  withCredentials: true,
});

function Message() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { selectedGroup } = useUserContext();
  const [error, setError] = useState("");

  const formatDate = useDateFormatter;

  useEffect(() => {
    const storedMessages = localStorage.getItem(
      `group-${selectedGroup.groupId}`
    );
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    socket.on("init", (loadedMessages) => {
      setMessages(loadedMessages);
      localStorage.setItem(
        `group-${selectedGroup.groupId}`,
        JSON.stringify(loadedMessages)
      );
    });

    socket.on("receive_message", ({ text: newMessage, groupId }) => {
      if (groupId.toString() !== selectedGroup.groupId.toString()) return;

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      localStorage.setItem(
        `group-${selectedGroup.groupId}`,
        JSON.stringify([...messages, newMessage])
      );
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
    <div className="message-container">
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
          <li key={index} className="list-group-item">
            {msg.text} - {formatDate(new Date(msg.createdAt))}
            {msg.sender.username && (
              <span> - Sent by: {msg.sender.username}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Message;
