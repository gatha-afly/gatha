import React, { useState } from "react";
import { userAPI } from "../../../../api/userAPI";
import useUpdateUserData from "../../../../hooks/useUpdateUser";
import { devLog } from "../../../../utils/errorUtils";
import styles from "./LeaveGroup.module.css";

/**
 * Component to render a button allowing the user to leave a group.
 * @param {string} groupId - ID of the group.
 * @param {string} userId - ID of the user.
 * @param {Function} onLeaveGroup - Callback function to handle leaving the group.
 */
const LeaveGroup = ({ groupId, userId }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { fetchUserUpdates } = useUpdateUserData();

  const handleLeaveGroup = async () => {
    try {
      const response = await userAPI.patch(
        `/groups/leave-group/${groupId}/${userId}`
      );
      devLog(response);
      fetchUserUpdates();
      localStorage.removeItem("selectedGroup");
    } catch (error) {
      console.error("Error leaving group:", error);
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
    </div>
  );
};

export default LeaveGroup;
