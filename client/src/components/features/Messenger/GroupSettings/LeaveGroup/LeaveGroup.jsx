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
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.groupId - ID of the group.
 * @param {string} props.userId - ID of the user.
 * @param {function} props.onDefaultViewClick - Callback to set the default view.
 * @returns {JSX.Element} - Rendered component.
 */
const LeaveGroup = ({ groupId, userId, onDefaultViewClick }) => {
  // Access necessary context and hooks
  const { deleteSelectedGroup } = useUserContext();
  const { fetchUserUpdates } = useUpdateUserData();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Use the useConfirmationDialog hook for ConfirmationDialog component
  const { showConfirmation, toggleConfirmationDialog, hideConfirmationDialog } =
    useConfirmationDialog();
  // Handles the leave group action, sends a PATCH request to the serve
  const handleLeaveGroup = async () => {
    try {
      const response = await userAPI.patch(
        `/groups/leave-group/${groupId}/${userId}`
      );
      devLog(response);
      // Update user data and delete selected group from context
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
      {/* Button to trigger the confirmation dialog */}
      <button onClick={toggleConfirmationDialog}>Leave group</button>
      {/* Render confirmation dialog */}
      <div className={styles.confirmationDialog}>
        <ConfirmationDialog
          showConfirmation={showConfirmation}
          onConfirm={handleLeaveGroup}
          onCancel={hideConfirmationDialog}
          message='Are you sure you want to leave the group?'
          confirmText='yes'
          cancelText='no'
        />
      </div>
      {/* Display an error message if there's an error */}
      {error && <ErrorDisplay error={error} />}
    </div>
  );
};

export default LeaveGroup;
