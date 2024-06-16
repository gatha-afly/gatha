import { useState } from "react";
import styles from "./GroupMemberList.module.css";
import { devLog } from "@utils/errorUtils";
import Spinner from "@common/Spinner/Spinner";
import AssignMemberAsAdmin from "../AssignMemberAsAdmin/AssignMemberAsAdmin";
import RemoveMemberFromGroup from "../RemoveMemberFromGroup/RemoveMemberFromGroup";

/**
 * Renders list of group members. If logged in user is group admin, allows removing other non-admin users
 * @param {Object} groupMembers - Object containing group information and an array of group members.
 * @param {Array} groupMembers.groupMembers - Array of group members.
 * @param {string} groupMembers.groupName - Name of the group.
 * @param {boolean} props.userIsGroupAdmin - Indicators whether the logged-in user is group admin.
 * @param {string|null} groupMembers.error - Error message, if any.
 */
const GroupMemberList = ({
  groupMembers,
  groupId,
  onRefresh,
  userIsGroupAdmin,
}) => {
  // State and functions to manage whether confirmation is locked or not, so that only one such message is rendered at a time
  const [confirmationIsLocked, setConfirmationIsLocked] = useState(false);

  const handleConfirmationLock = () => {
    setConfirmationIsLocked(true);
  };

  const handleConfirmationUnlock = () => {
    setConfirmationIsLocked(false);
  };

  devLog("confirmation is locked:", confirmationIsLocked);

  // Format members
  const formattedMembers = groupMembers.groupMembers
    .map((member) => {
      // Generate formatted member information
      const memberInfo = `${member.firstName} ${member.lastName} (${member.username})`;
      // Return formatted member details
      return {
        info: memberInfo,
        isAdmin: member.isAdmin,
        userId: member._id,
      };
    })
    .reverse(); // Reverse the order for chronological descending display

  return (
    <div className={styles.renderMembers}>
      <h3>group members:</h3>
      {/* Check if there are members*/}
      {formattedMembers.length >= 1 ? (
        <ul>
          {/* Map through formatted members and display in a list */}
          {formattedMembers.map((formattedMember, index) => {
            return (
              <p className={styles.member} key={index}>
                {/* Display member information */}
                {formattedMember.info}
                {/* Display admin badge if the member is an admin */}
                {formattedMember.isAdmin && (
                  <span className={styles.adminBadge}>admin</span>
                )}
                {/* If logged in user is group admin, allow removing non-admin users from group */}
                {userIsGroupAdmin && !formattedMember.isAdmin && (
                  <div className={styles.userActions}>
                    <RemoveMemberFromGroup
                      groupId={groupId}
                      userId={formattedMember.userId}
                      onRefresh={onRefresh}
                      confirmationIsLocked={confirmationIsLocked}
                      onLockConfirmation={handleConfirmationLock}
                      onUnlockConfirmation={handleConfirmationUnlock}
                    />
                    <AssignMemberAsAdmin
                      groupId={groupId}
                      userId={formattedMember.userId}
                      onRefresh={onRefresh}
                      confirmationIsLocked={confirmationIsLocked}
                      onLockConfirmation={handleConfirmationLock}
                      onUnlockConfirmation={handleConfirmationUnlock}
                    />
                  </div>
                )}
              </p>
            );
          })}
        </ul>
      ) : (
        // Hacky: Show spinner while there's no group member
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default GroupMemberList;
