import React from "react";
import { MdDelete } from "react-icons/md";
import { userAPI } from "../../../../api/userAPI";
import { devLog } from "../../../../utils/errorUtils";

import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";

/**
 * DeleteMessage component for deleting a message.
 * @param {Object} props - Component props.
 * @param {string} props.messageId - The ID of the message to be deleted.
 * @param {string} props.senderId - The ID of the message sender.
 * @param {Function} props.setIsDeletedCallback - Callback function to update the isDeleted state.
 * @returns {JSX.Element} - Rendered component.
 */
const DeleteMessage = ({ messageId, senderId, setIsDeletedCallback }) => {
  const handleDeleteMessage = async () => {
    try {
      const response = await userAPI.patch(
        `/messages/delete/${messageId}/${senderId}`
      );
      // Call the callback to update the state in the parent component, triggering a rerender
      setIsDeletedCallback();
      devLog("Message deleted successfully", response);
    } catch (error) {
      devLog("Error deleting message:", error);
    }
  };

  return (
    <ReactIconNavigate
      onClick={() => {
        handleDeleteMessage();
      }}
      icon={MdDelete}
    />
  );
};

export default DeleteMessage;
