import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { userAPI } from "../../../../api/userAPI";
import { devLog } from "../../../../utils/errorUtils";
import ConfirmationDialog from "../../../common/ConfirmationDialog/ConfirmationDialog";
import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";
import styles from "./DeleteMessage.module.css";

/**
 * Component for deleting a message.
 * @param {Object} props - Component props.
 * @param {string} props.messageId - The ID of the message to be deleted.
 * @param {string} props.senderId - The ID of the message sender.
 * @param {Function} props.updateIsDeleted - Callback function to update the isDeleted state in parent component.
 * @returns {JSX.Element} - Rendered component.
 */
const DeleteMessage = ({ messageId, senderId, updateIsNotDeleted }) => {
  // State to manage the visibility of the confirmation dialog
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteMessage = async () => {
    try {
      const response = await userAPI.patch(
        `/messages/delete/${messageId}/${senderId}`
      );
      devLog("Message deleted successfully", response);
      // Update the state in the parent component, triggering a rerender
      updateIsNotDeleted();
    } catch (error) {
      devLog("Error deleting message:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <div className={styles.deleteContainer}>
        <span className={styles.icon}>
          <ReactIconNavigate
            onClick={() => setShowConfirmation(true)}
            icon={AiOutlineDelete}
            size={1.8}
            margin={0}
          />
        </span>
        {/* Render the confirmation dialog */}
        <ConfirmationDialog
          className={styles.confirmationDialog}
          showConfirmation={showConfirmation}
          onConfirm={handleDeleteMessage}
          onCancel={() => setShowConfirmation(false)}
          confirmText='delete'
          cancelText='cancel'
          buttonTextSize='1.2'
        />
      </div>
    </>
  );
};

export default DeleteMessage;
