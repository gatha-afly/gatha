import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { userAPI } from "../../../../api/userAPI";
import { devLog } from "../../../../utils/errorUtils";
import ConfirmationDialog from "../../../common/ConfirmationDialog/ConfirmationDialog";
import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";
import styles from "./DeleteMessage.module.css";

/**
 * DeleteMessage component for deleting a message.
 * @param {Object} props - Component props.
 * @param {string} props.messageId - The ID of the message to be deleted.
 * @param {string} props.senderId - The ID of the message sender.
 * @param {Function} props.setIsDeletedCallback - Callback function to update the isDeleted state.
 * @returns {JSX.Element} - Rendered component.
 */
const DeleteMessage = ({ messageId, senderId, setIsDeletedCallback }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleDeleteMessage = async () => {
    try {
      const response = await userAPI.patch(
        `/messages/delete/${messageId}/${senderId}`
      );
      // Call the callback to update the state in the parent component, triggering a rerender
      devLog("Message deleted successfully", response);
      setIsDeletedCallback(true);
    } catch (error) {
      devLog("Error deleting message:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <ReactIconNavigate
        onClick={() => setShowConfirmation(true)}
        icon={AiOutlineDelete}
      />
      {/* Render the confirmation dialog */}
      <ConfirmationDialog
        className={styles.confirmationDialog}
        showConfirmation={showConfirmation}
        onConfirm={handleDeleteMessage}
        onCancel={() => setShowConfirmation(false)}
        message="Delete message?"
        confirmText="yes"
        cancelText="no"
      />
    </>
  );
};

export default DeleteMessage;
