import { useState } from "react";

const useConfirmationDialog = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancelLeave = () => {
    setShowConfirmation(false);
  };

  return { showConfirmation, handleShowConfirmation, handleCancelLeave };
};

export default useConfirmationDialog;
