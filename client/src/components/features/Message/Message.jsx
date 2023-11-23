import "./message.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import useDateFormatter from "../../../hooks/useDateFormatter";
import useUserContext from "../../../context/useUserContext";

// Establish a socket connection to the server
const socket = io.connect("http://localhost:3001");

// Message component
function Message() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { user } = useUserContext();

  // Use the custom hook to format the date
  const formatDate = useDateFormatter;

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
      socket.emit("send_message", { text: input, senderId: user.id });
      setInput(""); // Clear the input field after sending the message
    }
  };

  return (
    <div className="message-container">
      <input
        placeholder="Message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send Message</button>
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
