// MessageInput.jsx
import React, { useState } from "react";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import styles from "./SendMessage.module.css";

function SendMessage({ selectedGroup, socket }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      // Emit a "send_message" event to the server with the message text and group ID
      socket.emit("send_message", {
        text: input,
        groupId: selectedGroup?.groupId,
      });

      // Clear the input field and reset the error stat
      setInput("");
      setError("");
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        placeholder='Message'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>send</button>
      {/* Display error message if present */}
      <ErrorDisplay error={error} />
    </div>
  );
}

export default SendMessage;
