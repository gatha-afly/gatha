/**
 * Handles the click event for an icon based on the confirmation lock status.
 *
 * @param {boolean} confirmationIsLocked - Whether the confirmation dialog is locked or not.
 * @param {Function} showConfirmationDialog - Function to show the confirmation dialog.
 * @param {Function} onLockConfirmation - Function to lock the confirmation dialog.
 * @returns {Function} The click event handler function for the icon.
 */
export const handleIconClick = (
  confirmationIsLocked,
  showConfirmationDialog,
  onLockConfirmation
) => {
  /**
   * Click event handler for the icon.
   */
  return () => {
    if (!confirmationIsLocked) {
      showConfirmationDialog();
      onLockConfirmation();
    }
  };
};

/**
 * Handles the click event for cancel action.
 *
 * @param {Function} hideConfirmationDialog - Function to hide the confirmation dialog.
 * @param {Function} onUnlockConfirmation - Function to unlock the confirmation dialog.
 * @returns {Function} The click event handler function for cancel action.
 */
export const handleCancelClick = (
  hideConfirmationDialog,
  onUnlockConfirmation
) => {
  /**
   * Click event handler for cancel action.
   */
  return () => {
    hideConfirmationDialog();
    onUnlockConfirmation();
  };
};
