import "./message.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import useDateFormatter from "../../../hooks/useDateFormatter";
import useUserContext from "../../../context/useUserContext";

// Connecting to the socket.io server
const socket = io.connect("http://localhost:3001", {
  withCredentials: true,
});

function Message() {
  // State hooks for managing messages, user input, selected group, and errors
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { selectedGroup } = useUserContext();
  const [error, setError] = useState("");

  // Custom hook for formatting dates
  const formatDate = useDateFormatter;

  // Effect hook for handling socket events and local storage
  useEffect(() => {
    // Retrieve stored messages for the selected group from local storage
    const storedMessages = localStorage.getItem(
      `group-${selectedGroup.groupId}`
    );
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    // Listen for initialization event from the server
    socket.on("init", (loadedMessages) => {
      // Update state with loaded messages
      setMessages(loadedMessages);

      // Save loaded messages to local storage
      localStorage.setItem(
        `group-${selectedGroup.groupId}`,
        JSON.stringify(loadedMessages)
      );
    });

    // Listen for new messages from the server
    socket.on("receive_message", ({ text: newMessage, groupId }) => {
      // Check if the message belongs to the currently selected group
      if (groupId.toString() !== selectedGroup.groupId.toString()) return;

      // Update state with the new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Update local storage with the new message
      localStorage.setItem(
        `group-${selectedGroup.groupId}`,
        JSON.stringify([...messages, newMessage])
      );
    });

    // Listen for error events from the server
    socket.on("error", ({ message }) => {
      // Set error state with the received error message
      setError(message);
    });

    // Cleanup function to remove socket event listeners when the component unmounts
    return () => socket.off();
  }, [selectedGroup.groupId]);

  // Function to send a new message to the server
  const sendMessage = () => {
    if (input.trim()) {
      // Emit a "send_message" event to the server with the message text and group ID
      socket.emit("send_message", {
        text: input,
        groupId: selectedGroup.groupId,
      });

      // Clear the input field and reset the error state
      setInput("");
      setError("");
    }
  };

  // Render the message input form, error message (if any), and the list of messages
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
