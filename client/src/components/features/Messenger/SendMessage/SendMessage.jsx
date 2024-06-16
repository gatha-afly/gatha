import { useState, useEffect, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import EmojiPicker from "../EmojiPicker/RenderEmojiPicker";
import ErrorDisplay from "@common/ErrorDisplay/ErrorDisplay";
import styles from "./SendMessage.module.css";
import ReactIconNavigate from "@common/ReactIconNavigate/ReactIconNavigate";
import socket from "@api/socket";
import { devLog } from "@utils/errorUtils";
import useUserContext from "@hooks/useUserContext";
import { isBigScreen } from "@utils/deviceUtils";
import useSetCallbackWhenSelectedGroupChanges from "@hooks/useSetCallbackWhenSelectedGroupChanges";

/**
 * Component for sending messages in a chat.
 * @component
 * @param {Object} selectedGroup - The selected group information.
 * @returns {JSX.Element} - The rendered component.
 */
function SendMessage({ selectedGroup }) {
  // State for input text, error messages, selected emoji, and emoji picker visibility
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // User context for managing typing indicators
  const { setIsTyping, isTyping, setTypingUser } = useUserContext();

  // Refs for input, typing timeout, and emoji picker container
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const emojiPickerContainerRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Close emoji picker if it's open and user clicked outside the emoji picker container
      if (
        showEmojiPicker &&
        emojiPickerContainerRef.current &&
        !emojiPickerContainerRef.current.contains(e.target) &&
        !e.target.closest(`.${styles.emojiButton}`)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.body.addEventListener("click", handleDocumentClick);

    return () => {
      document.body.removeEventListener("click", handleDocumentClick);
    };
  }, [showEmojiPicker]);

  // Set up socket listeners for typing events
  useEffect(() => {
    const handleTyping = ({ user, groupId }) => {
      if (groupId === selectedGroup?.groupId) {
        devLog(`${user} is typing...`);
        setTypingUser(user);
        setIsTyping(true);
      }
    };

    const handleStopTyping = ({ user, groupId }) => {
      if (groupId === selectedGroup?.groupId) {
        devLog(`${user} stopped typing.`);
        setIsTyping(false);
        setTypingUser("");
      }
    };

    socket.on("typing", handleTyping);
    socket.on("stop_typing", handleStopTyping);

    // Clean up socket listeners when the component unmounts
    return () => {
      socket.off("typing", handleTyping);
      socket.off("stop_typing", handleStopTyping);
      clearTimeout(typingTimeoutRef.current);
    };
  }, [setIsTyping, setTypingUser, selectedGroup?.groupId, typingTimeoutRef]);

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
      setShowEmojiPicker(false);
    }
  }, [chosenEmoji]);

  // Send a message when the send button is clicked or Enter is pressed
  const sendMessage = (e) => {
    if (input && input.trim()) {
      socket.emit(
        "send_message",
        {
          text: input,
          groupId: selectedGroup?.groupId,
        },
        (acknowledgment) => {
          devLog("Acknowledgment:", acknowledgment);
          if (acknowledgment.error) {
            setError(acknowledgment.error);
          } else {
            setInput("");
            setError("");
            socket.emit("stop_typing", { groupId: selectedGroup?.groupId });
            setIsTyping(false);
          }
        }
      );
    }
  };
  // Handle keydown events in the input field
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    } else {
      // Emit typing event if a key is pressed
      if (!isTyping) {
        socket.emit("typing", { groupId: selectedGroup?.groupId });
      }
      // Clear the typing timeout and set a new one

      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stop_typing", { groupId: selectedGroup?.groupId });
        setIsTyping(false);
      }, 5000);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  // Clear input field when selects a different group
  useSetCallbackWhenSelectedGroupChanges(selectedGroup, () => {
    setInput("");
    setIsTyping(false);
    socket.emit("stop_typing", { groupId: selectedGroup?.groupId });
  });

  return (
    // Form for sending messages
    <form className={styles.sendMessageContainer}>
      <div className={styles.sendMessageLine}>
        <textarea
          ref={inputRef}
          name="message-input"
          placeholder="Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {/* Emoji button and picker for big screens */}

        {isBigScreen && (
          <>
            <MdEmojiEmotions
              className={styles.emojiButton}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            {/* Emoji picker container */}

            <div
              ref={emojiPickerContainerRef}
              onMouseLeave={() => setShowEmojiPicker(false)}
            >
              {showEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
            </div>
          </>
        )}
        {/* Send button with icon */}

        <span className={styles.sendMessageButton}>
          <ReactIconNavigate
            onClick={sendMessage}
            size={3}
            icon={IoMdSend}
            margin={0}
          />
        </span>
      </div>
      {/* Display error message if there is an error  */}
      {error && <ErrorDisplay error={error} />}
    </form>
  );
}

export default SendMessage;
