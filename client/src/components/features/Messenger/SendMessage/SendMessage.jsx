import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "../EmojiPicker/RenderEmojiPicker"; // Updated import path
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import styles from "./SendMessage.module.css";
import { IoMdSend } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";
import socket from "../../../../api/socket";
import { devLog } from "../../../../utils/errorUtils";
import useUserContext from "../../../../hooks/useUserContext";

function SendMessage({ selectedGroup }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { setIsTyping, setTypingUser } = useUserContext();
  const inputRef = useRef(null);
  let typingTimeout;

  // Set up socket listeners for typing events
  useEffect(() => {
    socket.on("typing", ({ user }) => {
      devLog(`${user} is typing...`);
      setTypingUser(user);
      setIsTyping(true);
    });

    socket.on("stop_typing", ({ user }) => {
      devLog(`${user} stopped typing.`);
      setIsTyping(false);
      setTypingUser("");
    });

    // Clean up socket listeners when the component unmounts
    return () => {
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [setIsTyping, setTypingUser]);

  // Handle emoji selection
  useEffect(() => {
    if (chosenEmoji.emoji) {
      // Append the selected emoji to the current input value
      setInput((prevInput) => prevInput + chosenEmoji.emoji);
      setShowEmojiPicker(false);

      // Focus on the input field after selecting an emoji
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [chosenEmoji]);

  // Send a message when the send button is clicked or Enter is pressed
  const sendMessage = (e) => {
    if (input.trim()) {
      socket.emit(
        "send_message",
        {
          text: input,
          groupId: selectedGroup?.groupId,
        },
        (acknowledgment) => {
          if (acknowledgment.error) {
            setError(acknowledgment.error);
          } else {
            devLog("Message sent via send icon");
            setInput("");
            setError("");
            socket.emit("stop_typing", { groupId: selectedGroup?.groupId });
          }
        }
      );
    }
  };

  // Handle key events in the input field (e.g., Enter key
  const handleKeyDown = (e) => {
    clearTimeout(typingTimeout);
    if (e.key === "Enter") {
      e.preventDefault();
      devLog("Message sent via Enter button");
      sendMessage(e);
      setInput("");
    } else {
      // Notify others that the user is typing
      socket.emit("typing", { groupId: selectedGroup?.groupId });
      typingTimeout = setTimeout(() => {
        socket.emit("stop_typing", { groupId: selectedGroup?.groupId });
      }, 1000);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <form className={styles.sendMessageContainer}>
      <div className={styles.sendMessageLine}>
        <input
          ref={inputRef}
          name="message-input"
          type="text"
          placeholder="Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <MdEmojiEmotions
          className={styles.emojiButton}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />

        {showEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}

        <span className={styles.sendMessageButton}>
          <ReactIconNavigate onClick={sendMessage} size={3} icon={IoMdSend} />
        </span>
      </div>

      <ErrorDisplay error={error} />
    </form>
  );
}

export default SendMessage;
