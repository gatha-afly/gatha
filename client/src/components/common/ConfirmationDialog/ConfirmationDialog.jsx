import React, { useEffect } from "react";
import styles from "./ConfirmationDialog.module.css";

/**
 * Component to display a confirmation dialog. Additionally, parent component should use useConfirmationDialog custom hook
 * @param {Object} props - Component props.
 * @param {Function} props.onConfirm - Callback function to execute on confirmation.
 * @param {Function} props.onCancel - Callback function to execute on cancellation.
 * @param {string} props.confirmText - Text for the confirm button.
 * @param {string} props.cancelText - Text for the cancel button.
 * @param {string} props.message - Message to display in the confirmation dialog.
 * @returns {JSX.Element} - Rendered component.
 */
const ConfirmationDialog = ({
  showConfirmation,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
  message,
}) =>
  // Render the confirmation dialog only if showConfirmation is true
  showConfirmation && (
    <div className={styles.confirmationContainer}>
      <p className={styles.confirmationMessage}>{message}</p>
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

export default ConfirmationDialog;
