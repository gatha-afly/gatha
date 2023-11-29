// MessageInput.jsx
import React, { useState } from "react";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import styles from "./SendMessage.module.css";
import { IoMdSend } from "react-icons/io";
import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";

/**
 * SendMessage component for sending new messages in the selected group.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.selectedGroup - The selected group object.
 * @param {Object} props.socket - The socket object for communication.
 * @returns {React.Component} The rendered SendMessage component.
 */
function SendMessage({ selectedGroup, socket }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  /**
   * Handles sending a message and related errors
   */
  const sendMessage = (e) => {
    if (input.trim()) {
      // Emit a "send_message" event to the server with the message text and group ID
      socket.emit("send_message", {
        text: input,
        groupId: selectedGroup?.groupId,
      });

      // Clear the input field and reset the error state
      setInput("");
      setError("");
    }
  };

  return (
    <form className={styles.sendMessageContainer}>
      {/* Render message input field, send message when enter key is pressed */}
      <div className={styles.sendMessageLine}>
        <input
          name='message-input'
          type='text'
          placeholder='Message'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage(e);
            }
          }}
        />
        {/* Render send message button */}
        <span className={styles.sendMessageButton}>
          <ReactIconNavigate onClick={sendMessage} size={3} icon={IoMdSend} />
        </span>
      </div>
      {/* Display error message if present
       */}
      <ErrorDisplay error={error} />
    </form>
  );
}

export default SendMessage;
