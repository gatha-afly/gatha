import { useState, useRef } from "react";
import { FaCopy } from "react-icons/fa";
import styles from "./CopyToClipboard.module.css";
import ReactIconNavigate from "@common/ReactIconNavigate/ReactIconNavigate";

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
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.groupCodeContainer} onClick={handleCopyClick}>
        <p className={styles.groupCode}>{infoToCopy}</p>
        <ReactIconNavigate icon={FaCopy} size={1.6} margin={0} />
      </div>

      {/* Display "Copied!" message when isCopied is true */}
      {isCopied && <span className={styles.feedbackMessage}>Copied!</span>}

      {/* Hidden input field for copying text */}
      <input
        type="text"
        value={infoToCopy}
        readOnly
        style={{ position: "absolute", left: "-9999px" }}
        ref={inputRef}
      />
    </div>
  );
};

export default CopyToClipboard;
