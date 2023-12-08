import { useState } from "react";
import { userAPI } from "../../../../api/userAPI";
import useUpdateUserData from "../../../../hooks/useUpdateUser";
import { devLog } from "../../../../utils/errorUtils";
import styles from "./LeaveGroup.module.css";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";

/**
 * Component to render a button allowing the user to leave a group.
 * @param {string} groupId - ID of the group.
 * @param {string} userId - ID of the user.
 * @param {Function} onLeaveGroup - Callback function to handle leaving the group.
 */
const LeaveGroup = ({ groupId, userId, onDefaultViewClick }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { fetchUserUpdates } = useUpdateUserData();
  const [error, setError] = useState("");

  const handleLeaveGroup = async () => {
    try {
      const response = await userAPI.patch(
        `/groups/leave-group/${groupId}/${userId}`
      );
      devLog(response);
      fetchUserUpdates();
      localStorage.removeItem("selectedGroup");
      onDefaultViewClick();
    } catch (error) {
      devLog(error);
      if (error.response.data.code === 405) {
        setError("Assign an admin before leaving the group.");
      }
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancelLeave = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <button onClick={handleShowConfirmation}>Leave Group</button>

      {showConfirmation && (
        <div>
          <p>Are you sure you want to leave the group?</p>
          <div className={styles.confirmation}>
            <button className={styles.confirmButton} onClick={handleLeaveGroup}>
              Yes
            </button>
            <button className={styles.abortButton} onClick={handleCancelLeave}>
              No
            </button>
          </div>
        </div>
      )}
      {error ? <ErrorDisplay error={error} /> : null}
    </div>
  );
};

export default LeaveGroup;
