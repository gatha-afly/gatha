// Message.js
import "./message.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import useDateFormatter from "../../../hooks/useDateFormatter";
import useUserContext from "../../../context/useUserContext";

// Establish a socket connection to the server
const socket = io.connect("http://localhost:3001", {
  withCredentials: true,
});

function Message() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { selectedGroup } = useUserContext();
  const [error, setError] = useState("");

  // Use the custom hook to format the date
  const formatDate = useDateFormatter;

  useEffect(() => {
    // Event listener for initial messages
    socket.on("init", (loadedMessages) => {
      setMessages(loadedMessages);
    });

    // Event listener for new messages
    socket.on("receive_message", ({ text: newMessage, groupId }) => {
      console.log(groupId, selectedGroup.groupId);
      if (groupId.toString() !== selectedGroup.groupId.toString()) return;
      console.log(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Event listener for errors
    socket.on("error", ({ message }) => {
      setError(message);
    });

    // Clean up socket connection when the component unmounts
    return () => socket.off();
  }, [selectedGroup.groupId]);

  // Function to send a new message
  const sendMessage = () => {
    if (input.trim()) {
      // Emit a message event with the text and sender ID
      console.log("sending", input, "to group", selectedGroup.groupId);
      socket.emit("send_message", {
        text: input,
        groupId: selectedGroup.groupId,
      });
      setInput(""); // Clear the input field after sending the message
      setError(""); // Clear previous errors
    }
  };

  console.log(selectedGroup, selectedGroup.groupId);

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
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      <h1>Messages:</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index} className="list-group-item">
            {msg.text} - {formatDate(new Date(msg.createdAt))}
            {msg.sender && msg.sender.username && (
              <span> - Sent by: {msg.sender.username}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Message;
