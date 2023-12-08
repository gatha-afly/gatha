import { useState } from "react";
import { userAPI } from "../../../../../api/userAPI";
import { devLog } from "../../../../../utils/errorUtils";
import styles from "./AssignMemberAsAdmin.module.css";
import ErrorDisplay from "../../../../common/ErrorDisplay/ErrorDisplay";
import ReactIconNavigate from "../../../../common/ReactIconNavigate/ReactIconNavigate";
import { FaUserCog } from "react-icons/fa";
import useUserContext from "../../../../../hooks/useUserContext";
import ConfirmationDialog from "../../../../common/ConfirmationDialog/ConfirmationDialog";
import useConfirmationDialog from "../../../../../hooks/useConfirmationDialog";

/**
 * Renders a react-icon to make a user admin of a group.
 * @param {string} groupId - ID of the group.
 * @param {string} userId - ID of the to be removed user.
 */
const AssignMemberAsAdmin = ({ groupId, userId, onRefresh }) => {
  // State to handle error messages
  const [error, setError] = useState("");

  // Use the useConfirmationDialog hook to manage the confirmation dialog state
  const { showConfirmation, toggleConfirmationDialog, hideConfirmationDialog } =
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
    }
  };

  return (
    <div className={styles.assignMemberContainer}>
      <span className={styles.assignMemberIcon}>
        <ReactIconNavigate
          icon={FaUserCog}
          onClick={toggleConfirmationDialog}
          size={2.2}
        />
        {/* Display an error message if there's an error */}
        {error && <ErrorDisplay error={error} />}
      </span>

      {/* Render confirmation dialog outside the removeUserContainer */}
      <div className={styles.confirmationContainer}>
        <ConfirmationDialog
          showConfirmation={showConfirmation}
          onConfirm={handleMakeMemberAdmin}
          onCancel={hideConfirmationDialog}
          message='Assign as admin?'
        />
      </div>
    </div>
  );
};

export default AssignMemberAsAdmin;
