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
  const { user } = useUserContext();
  const [room, setRoom] = useState("");
  const formatDate = useDateFormatter;

  const joinRoom = () => {
    if (room.trim() !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("send_message", { text: input, room });
      setInput("");
    }
  };

  useEffect(() => {
    socket.on("init", (loadedMessages) => {
      setMessages(loadedMessages);
    });

    socket.on("receive_message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => socket.off();
  }, [room]);

  return (
    <div className="message-container">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
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
