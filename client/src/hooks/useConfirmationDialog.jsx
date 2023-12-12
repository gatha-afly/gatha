import { useState } from "react";

/**
 * Custom hook for managing a confirmation dialog state. To be used with ConfirmationDialog component.
 *
 * @returns {Object} - Object containing state and functions for managing the confirmation dialog.
 * @property {boolean} showConfirmation - Flag indicating whether the confirmation dialog should be visible.
 * @property {function} toggleConfirmationDialog - Function to toggle the visibility of the confirmation dialog.
 * @property {function} showConfirmationDialog - Function to show the confirmation dialog.
 * @property {function} hideConfirmationDialog - Function to hide the confirmation dialog.
 */
const useConfirmationDialog = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const toggleConfirmationDialog = () => {
    setShowConfirmation((prev) => !prev);
  };

  const showConfirmationDialog = () => {
    setShowConfirmation(true);
  };

  const hideConfirmationDialog = () => {
    setShowConfirmation(false);
  };

  return {
    showConfirmation,
    toggleConfirmationDialog,
    showConfirmationDialog,
    hideConfirmationDialog,
  };
};

export default useConfirmationDialog;
