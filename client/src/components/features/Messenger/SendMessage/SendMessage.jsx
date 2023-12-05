import { useState, useEffect } from "react";
import Picker from "emoji-picker-react";
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
  const [chosenEmoji, setChosenEmoji] = useState(null); // Track the chosen emoji
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { setIsTyping, setTypingUser } = useUserContext();
  let typingTimeout;

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

    return () => {
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [setIsTyping, setTypingUser]);

  useEffect(() => {
    if (chosenEmoji) {
      // Handle the chosenEmoji update
      setInput((prevInput) => prevInput + chosenEmoji.emoji);
      setShowEmojiPicker(false); // Close emoji picker after selecting an emoji
    }
  }, [chosenEmoji]);

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

  const handleKeyDown = (e) => {
    clearTimeout(typingTimeout);
    if (e.key === "Enter") {
      e.preventDefault();
      devLog("Message sent via Enter button");
      sendMessage(e);
      setInput("");
    } else {
      socket.emit("typing", { groupId: selectedGroup?.groupId });
      typingTimeout = setTimeout(() => {
        socket.emit("stop_typing", { groupId: selectedGroup?.groupId });
      }, 1000);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
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

        {/* Emoji button to toggle the emoji picker */}
        <MdEmojiEmotions
          className={styles.emojiButton}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />

        {/* Emoji picker with positioning */}
        {showEmojiPicker && (
          <div className={styles.emojiPickerContainer}>
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}

        <span className={styles.sendMessageButton}>
          <ReactIconNavigate onClick={sendMessage} size={3} icon={IoMdSend} />
        </span>
      </div>

      <ErrorDisplay error={error} />
    </form>
  );
}

export default SendMessage;
