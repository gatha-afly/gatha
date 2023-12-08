import { useState } from "react";
import { userAPI } from "../../../../../../api/userAPI";
import useUpdateUserData from "../../../../../../hooks/useUpdateUser";
import { devLog } from "../../../../../../utils/errorUtils";
import styles from "./LeaveGroup.module.css";
import ErrorDisplay from "../../../../../common/ErrorDisplay/ErrorDisplay";
import useUserContext from "../../../../../../hooks/useUserContext";
import { isMobile } from "../../../../../../utils/deviceUtils";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../../../common/ConfirmationDialog/ConfirmationDialog";
import useConfirmationDialog from "../../../../../hooks/useConfirmationDialog";

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
  const { showConfirmation, handleShowConfirmation, handleCancelConfirmation } =
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
      handleCancelConfirmation();
    }
  };

  return (
    <div className={styles.leaveGroupContainer}>
      <button onClick={handleShowConfirmation}>leave group</button>
      {/* Render confirmation dialog*/}
      <ConfirmationDialog
        showConfirmation={showConfirmation}
        onConfirm={handleLeaveGroup}
        onCancel={handleCancelConfirmation}
        message='Are you sure you want to leave the group?'
      />
      {error && <ErrorDisplay error={error} />}
    </div>
  );
};

export default LeaveGroup;
