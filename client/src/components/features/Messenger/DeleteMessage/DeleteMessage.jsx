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
 * @param {Function} props.updateIsDeleted - Callback function to update the isDeleted state in parent component.
 * @returns {JSX.Element} - Rendered component.
 */
const DeleteMessage = ({ messageId, senderId, updateIsDeleted }) => {
  // State to manage the visibility of the confirmation dialog
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleDeleteMessage = async () => {
    try {
      const response = await userAPI.patch(
        `/messages/delete/${messageId}/${senderId}`
      );
      devLog("Message deleted successfully", response);
      // Update the state in the parent component, triggering a rerender
      updateIsDeleted();
    } catch (error) {
      devLog("Error deleting message:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <ReactIconNavigate
        /* Icon to initiate the deletion process */

        onClick={() => setShowConfirmation(true)}
        icon={AiOutlineDelete}
      />
      {/* Render the confirmation dialog */}
      <ConfirmationDialog
        className={styles.confirmationDialog}
        showConfirmation={showConfirmation}
        onConfirm={handleDeleteMessage}
        onCancel={() => setShowConfirmation(false)}
        confirmText="delete"
        cancelText="cancel"
      />
    </>
  );
};

export default DeleteMessage;
