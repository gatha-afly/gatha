import { useState } from "react";
import { userAPI } from "../../../../../api/userAPI";
import { devLog } from "../../../../../utils/errorUtils";
import styles from "./RemoveMemberFromGroup.module.css";
import ErrorDisplay from "../../../../common/ErrorDisplay/ErrorDisplay";
import ReactIconNavigate from "../../../../common/ReactIconNavigate/ReactIconNavigate";
import { FaUserTimes } from "react-icons/fa";
import useUserContext from "../../../../../hooks/useUserContext";
import ConfirmationDialog from "../../../../common/ConfirmationDialog/ConfirmationDialog";
import useConfirmationDialog from "../../../../../hooks/useConfirmationDialog";
import {
  handleCancelClick,
  handleIconClick,
} from "../../../../../utils/confirmationUtils";

/**
 * Renders a react-icon to remove a user from a group.
 * @param {string} groupId - ID of the group.
 * @param {string} userId - ID of the to-be-removed user.
 * @param {boolean} confirmationIsLocked - Whether the confirmation dialog is locked or not.
 * @param {Function} onLockConfirmation - Function to lock the confirmation dialog.
 * @param {Function} onUnlockConfirmation - Function to unlock the confirmation dialog.
 */
const RemoveMemberFromGroup = ({
  groupId,
  userId,
  onRefresh,
  confirmationIsLocked,
  onLockConfirmation,
  onUnlockConfirmation,
}) => {
  // State to handle error messages
  const [error, setError] = useState("");

  // Use the useConfirmationDialog hook to manage the confirmation dialog state
  const { showConfirmation, showConfirmationDialog, hideConfirmationDialog } =
    useConfirmationDialog();

  // Get the adminId (= id of the loggedIn user) from the user context
  const {
    user: { userId: adminId },
  } = useUserContext();

  const handleRemoveUserFromGroup = async () => {
    try {
      // Make a PATCH request to remove the member from the group
      const response = await userAPI.patch(
        `/groups/remove-member/${groupId}/${adminId}/${userId}`
      );
      devLog(response);
      onRefresh();
    } catch (error) {
      devLog(error);
      setError("An error occurred while removing the member from the group.");
    } finally {
      // Close the confirmation dialog regardless of success or failure
      hideConfirmationDialog();
      // Set confirmationIsLocked to false after confirmation
      onUnlockConfirmation();
    }
  };

  // Use utility functions to update parent confirmationIsLocked state based on on user actions
  const onIconClick = handleIconClick(
    confirmationIsLocked,
    showConfirmationDialog,
    onLockConfirmation
  );

  const onCancelClick = handleCancelClick(
    hideConfirmationDialog,
    onUnlockConfirmation
  );

  return (
    <div className={styles.removeMemberContainer}>
      <span className={styles.removeMemberIcon}>
        <ReactIconNavigate
          icon={FaUserTimes}
          onClick={onIconClick}
          size={2.2}
        />
        {/* Display an error message if there's an error */}
        {error && <ErrorDisplay error={error} />}
      </span>
      {/* Render confirmation dialog outside the removeUserContainer */}
      <div className={styles.confirmationContainer}>
        <ConfirmationDialog
          showConfirmation={showConfirmation}
          onConfirm={handleRemoveUserFromGroup}
          onCancel={onCancelClick}
          message='Remove user?'
        />
      </div>
    </div>
  );
};

export default RemoveMemberFromGroup;
