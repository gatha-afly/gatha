import React from "react";
import Picker from "emoji-picker-react";
import styles from "./EmojiPicker.module.css";

function EmojiPicker({ onEmojiClick }) {
  return (
    <div className={styles.emojiPickerContainer}>
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
}

export default EmojiPicker;