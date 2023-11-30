// MessageInput.jsx
import { useState, useEffect } from "react";
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
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    // Listen for typing events from the server
    socket.on("typing", ({ user }) => {
      // Handle typing event, e.g., show a typing indicator
      console.log(`${user} is typing...`);
      setTypingUser(user);
      setIsTyping(true);
    });

    // Listen for stop_typing events from the server
    socket.on("stop_typing", ({ user }) => {
      // Handle stop_typing event, e.g., hide the typing indicator
      console.log(`${user} stopped typing.`);
      setIsTyping(false);
      setTypingUser("");
    });

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [socket]);
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

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") {
      // Emit a "typing" event when a key is pressed
      socket.emit("typing", { groupId: selectedGroup?.groupId });
    } else {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <form className={styles.sendMessageContainer}>
      <div className={styles.sendMessageLine}>
        <input
          name="message-input"
          type="text"
          placeholder="Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <span className={styles.sendMessageButton}>
          <ReactIconNavigate onClick={sendMessage} size={3} icon={IoMdSend} />
        </span>
      </div>
      {isTyping && (
        <div className={styles.typingIndicator}>{typingUser} is typing...</div>
      )}
      <ErrorDisplay error={error} />
    </form>
  );
}

export default SendMessage;
