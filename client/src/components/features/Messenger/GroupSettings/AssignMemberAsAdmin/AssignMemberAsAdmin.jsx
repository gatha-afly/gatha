import { useState } from "react";
import { FaUserCog } from "react-icons/fa";
import styles from "./AssignMemberAsAdmin.module.css";
import { userAPI } from "@api/userAPI";
import { devLog } from "@utils/errorUtils";
import ErrorDisplay from "@common/ErrorDisplay/ErrorDisplay";
import ReactIconNavigate from "@common/ReactIconNavigate/ReactIconNavigate";
import useUserContext from "@hooks/useUserContext";
import ConfirmationDialog from "@common/ConfirmationDialog/ConfirmationDialog";
import useConfirmationDialog from "@hooks/useConfirmationDialog";
import { handleCancelClick, handleIconClick } from "@utils/confirmationUtils";

/**
 * Renders a react-icon to assign a user as an admin of a group.
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.groupId - ID of the group.
 * @param {string} props.userId - ID of the user to be assigned as an admin.
 * @param {function} props.onRefresh - Callback to refresh the component.
 * @param {boolean} props.confirmationIsLocked - Indicates whether the confirmation dialog in parent component is locked.
 * @param {function} props.onLockConfirmation - Callback to lock the confirmation dialog.
 * @param {function} props.onUnlockConfirmation - Callback to unlock the confirmation.
 */
const AssignMemberAsAdmin = ({
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

  devLog("adminId", adminId);
  devLog("userId", userId);

  const handleMakeMemberAdmin = async () => {
    try {
      // Make a PATCH request to remove the member from the group
      const response = await userAPI.patch(
        `/groups/add-new-admin/${groupId}/${adminId}/${userId}`
      );
      devLog(response);
      onRefresh();
    } catch (error) {
      devLog(error);
      setError("An error occurred while assigning the member as admin.");
    } finally {
      // Close the confirmation dialog regardless of success or failure
      hideConfirmationDialog();
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
    <div className={styles.assignMemberContainer}>
      <span className={styles.assignMemberIcon}>
        <ReactIconNavigate
          icon={FaUserCog}
          onClick={onIconClick}
          size={2.2}
          margin={0}
        />
        {/* Display an error message if there's an error */}
        {error && <ErrorDisplay error={error} />}
      </span>

      {/* Render confirmation dialog outside the removeUserContainer */}
      <div className={styles.confirmationContainer}>
        <ConfirmationDialog
          showConfirmation={showConfirmation}
          onConfirm={handleMakeMemberAdmin}
          onCancel={onCancelClick}
          message="Assign as admin?"
        />
      </div>
    </div>
  );
};

export default AssignMemberAsAdmin;
