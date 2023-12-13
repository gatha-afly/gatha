import { useState } from "react";
import styles from "./LeaveGroup.module.css";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../../../common/ConfirmationDialog/ConfirmationDialog";
import useConfirmationDialog from "../../../../../hooks/useConfirmationDialog";
import { userAPI } from "../../../../../api/userAPI";
import useUpdateUserData from "../../../../../hooks/useUpdateUser";
import { devLog } from "../../../../../utils/errorUtils";
import ErrorDisplay from "../../../../common/ErrorDisplay/ErrorDisplay";
import useUserContext from "../../../../../hooks/useUserContext";
import { isMobile } from "../../../../../utils/deviceUtils";

/**
 * Renders a button allowing the user to leave a group.
 * @param {string} groupId - ID of the group.
 * @param {string} userId - ID of the user.
 * @param {Function} onLeaveGroup - Callback function to handle leaving the group.
 */
const LeaveGroup = ({ groupId, userId, onDefaultViewClick }) => {
  const { deleteSelectedGroup } = useUserContext();
  const { fetchUserUpdates } = useUpdateUserData();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Use the useConfirmationDialog hook for ConfirmationDialog component
  const { showConfirmation, toggleConfirmationDialog, hideConfirmationDialog } =
    useConfirmationDialog();

  const handleLeaveGroup = async () => {
    try {
      const response = await userAPI.patch(
        `/groups/leave-group/${groupId}/${userId}`
      );
      devLog(response);
      fetchUserUpdates();
      deleteSelectedGroup();
      // Navigate to main for mobile devices, else set view back to default
      isMobile ? navigate("/main") : onDefaultViewClick();
    } catch (error) {
      devLog(error);
      // If not allowed status code, display error message from server
      if (error.response.data.code === 405) {
        setError(error.response.data.error);
      }
    } finally {
      hideConfirmationDialog();
    }
  };

  return (
    <div className={styles.leaveGroupContainer}>
      <button onClick={toggleConfirmationDialog}>Leave group</button>
      {/* Render confirmation dialog*/}
      <div className={styles.confirmationDialog}>
        <ConfirmationDialog
          showConfirmation={showConfirmation}
          onConfirm={handleLeaveGroup}
          onCancel={hideConfirmationDialog}
          message="Are you sure you want to leave the group?"
          confirmText="yes"
          cancelText="no"
          buttonTextSize="1.3"
          messageTextSize="1.4"
        />
      </div>
      {/* Display an error message if there's an error */}
      {error && <ErrorDisplay error={error} />}
    </div>
  );
};

export default LeaveGroup;
