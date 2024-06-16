import Picker from "emoji-picker-react";
import styles from "./EmojiPicker.module.css";

/**
 * EmojiPicker functional component
 * @param {Function} props.onEmojiClick - Callback function triggered on emoji click
 * @returns {JSX.Element} JSX Element representing the EmojiPicker
 */
function EmojiPicker({ onEmojiClick }) {
  return (
    <div className={styles.emojiPickerContainer}>
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
}

export default EmojiPicker;
