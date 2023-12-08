import React from "react";
import styles from "./Confirmation.module.css";

/**
 * Component to display a confirmation dialog. Additionally, parent component should use useConfirmationDialog custom hook
 * @param {Object} props - Component props.
 * @param {Function} props.onConfirm - Callback function to execute on confirmation.
 * @param {Function} props.onCancel - Callback function to execute on cancellation.
 * @param {string} props.confirmText - Text for the confirm button.
 * @param {string} props.cancelText - Text for the cancel button.
 * @param {string} props.message - Message to display in the confirmation dialog.
 * @param {string} props.error - Error message, if any.
 * @returns {JSX.Element} - Rendered component.
 */
const ConfirmationDialog = ({
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
  message,
}) => {
  return (
    <div className={styles.confirmationContainer}>
      <p className={styles.confirmation}>{message}</p>
      <div className={styles.confirmationButtons}>
        <button className={styles.confirmButton} onClick={onConfirm}>
          {confirmText}
        </button>
        <button className={styles.cancelButton} onClick={onCancel}>
          {cancelText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
