import { useState } from "react";
import { userAPI } from "../../../../../api/userAPI";
import { devLog } from "../../../../../utils/errorUtils";
import styles from "./RemoveMemberFromGroup.module.css";
import ErrorDisplay from "../../../../common/ErrorDisplay/ErrorDisplay";
import ReactIconNavigate from "../../../../common/ReactIconNavigate/ReactIconNavigate";
import { CiCircleRemove } from "react-icons/ci";
import useUserContext from "../../../../../hooks/useUserContext";
import ConfirmationDialog from "../../../../common/ConfirmationDialog/ConfirmationDialog";
import useConfirmationDialog from "../../../../../hooks/useConfirmationDialog";

/**
 * Renders a react-icon to remove a user from a group.
 * @param {string} groupId - ID of the group.
 * @param {string} userId - ID of the to be removed user.
 */
const RemoveMemberFromGroup = ({ groupId, userId, onRefresh }) => {
  // State to handle error messages
  const [error, setError] = useState("");

  // Use the useConfirmationDialog hook to manage the confirmation dialog state
  const {
    showConfirmation,
    handleShowConfirmation,
    handleCancelConfirmation,
    handleToggleShowConfirmation,
  } = useConfirmationDialog();

  // Get the adminId (= id of the loggedIn user) from the user context
  const {
    user: { userId: adminId },
  } = useUserContext();

  const handleLeaveGroup = async () => {
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
      handleCancelConfirmation();
    }
  };

  devLog(showConfirmation);

  return (
    <div>
      {/* Render confirmation dialog*/}
      <ConfirmationDialog
        showConfirmation={showConfirmation}
        onConfirm={handleLeaveGroup}
        onCancel={handleCancelConfirmation}
        message='Are you sure you want to leave the group?'
      />
      {/* Display an error message if there's an error */}
      {error && <ErrorDisplay error={error} />}
    </div>
  );
};

export default RemoveMemberFromGroup;
