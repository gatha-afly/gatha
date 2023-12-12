import React, { useState, useRef } from "react";
import styles from "./CopyToClipboard.module.css";

/**
 * Allows for rendering information and easily copying it to the clipboard, providing an instruction to copy and related feedback to the user
 * @param {string} props.infoToCopy - The text to be copied to the clipboard.
 * @param {string} [props.inputFieldWidth="fit-content"] - The width of the input field.
 */
const CopyToClipboard = ({ infoToCopy, inputFieldWidth = "fit-content" }) => {
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef(null);

  // select input field, execute copy command, deselect the text and update isCopied state
  const handleCopyClick = () => {
    inputRef.current.select();
    document.execCommand("copy");
    inputRef.current.blur();
    setIsCopied(true);
  };

  return (
    <div>
      <input
        className={styles.inputField}
        type='text'
        value={infoToCopy}
        readOnly // Make the input field read-only
        style={{ width: inputFieldWidth }}
        ref={inputRef}
      />
      <br />
      <button
        className={styles.button}
        onClick={handleCopyClick}
        disabled={isCopied} // Disable the button if 'isCopied' is true
      >
        {/* Display "Copied!" or "Copy to Clipboard" based on 'isCopied' */}
        {isCopied ? "Copied!" : "Copy to Clipboard"}{" "}
      </button>
    </div>
  );
};

export default CopyToClipboard;
