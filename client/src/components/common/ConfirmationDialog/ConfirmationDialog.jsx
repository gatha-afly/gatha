import React from "react";
import styles from "./ConfirmationDialog.module.css";

/**
 * Component to display a confirmation dialog.
 * @param {Object} props - Component props.
 * @param {Function} props.onConfirm - Callback function to execute on confirmation.
 * @param {Function} props.onCancel - Callback function to execute on cancellation.
 * @param {string} props.confirmText - Text for the confirm button.
 * @param {string} props.cancelText - Text for the cancel button.
 * @param {string} props.message - Message to display in the confirmation dialog.
 * @param {string} props.buttonTextSize - Size of the button text in rem.
 * @param {string} props.messageTextSize - Size of the confirmation message text in rem.
 * @returns {JSX.Element} - Rendered component.
 */
const ConfirmationDialog = ({
  showConfirmation,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
  message,
  buttonTextSize = "1.6",
  messageTextSize = "1.6",
}) =>
  // Render the confirmation dialog only if showConfirmation is true
  showConfirmation && (
    <div className={styles.confirmationContainer}>
      <p
        className={`${styles.confirmationMessage} ${styles.customTextSize}`}
        style={{ fontSize: `${messageTextSize}rem` }}>
        {message}
      </p>
      <div className={styles.confirmationButtons}>
        <button
          className={`${styles.confirmButton} ${styles.buttonWithCustomSize}`}
          style={{ fontSize: `${buttonTextSize}rem` }}
          onClick={onConfirm}>
          {confirmText}
        </button>
        <button
          className={`${styles.cancelButton} ${styles.buttonWithCustomSize}`}
          style={{ fontSize: `${buttonTextSize}rem` }}
          onClick={onCancel}>
          {cancelText}
        </button>
      </div>
    </div>
  );

export default ConfirmationDialog;
