import React from "react";
import useUserContext from "../../../../hooks/useUserContext";
import { devLog } from "../../../../utils/errorUtils";
import RemoveMemberFromGroup from "../RemoveMemberFromGroup/RemoveMemberFromGroup";
import styles from "./GroupMemberList.module.css";

/**
 * Component to render the list of group members.
 * @param {Object} groupMembers - Object containing group information and an array of group members.
 * @param {Array} groupMembers.groupMembers - Array of group members.
 * @param {string} groupMembers.groupName - Name of the group.
 * @param {string|null} groupMembers.error - Error message, if any.
 */
const GroupMemberList = ({ groupMembers, groupId, onRefresh }) => {
  // Get selectedGroup from useUserContext
  const { selectedGroup } = useUserContext();
  // Format members for desired display
  const formattedMembers = groupMembers.groupMembers
    .map((member) => {
      // Generate formatted member information
      const memberInfo = `${member.firstName} ${member.lastName} (${member.username})`;

      return {
        info: memberInfo,
        isAdmin: member.isAdmin,
        userId: member._id,
      };
    })
    .reverse();

  devLog("groupMembers:", groupMembers);
  devLog("FormattedMembers:", formattedMembers);
  devLog("groupId:", groupId);

  return (
    <div className={styles.renderMembers}>
      <h3>group members:</h3>
      {/* Check if there are members*/}
      {formattedMembers.length >= 1 ? (
        <ul>
          {/* Map through formatted members and display in a list */}
          {formattedMembers.map((formattedMember, index) => {
            // Log userId for each member
            devLog("userId:", formattedMember.userId);

            return (
              <li key={index}>
                {/* Display member information */}
                {formattedMember.info}
                {/* Display admin badge if the member is an admin */}
                {formattedMember.isAdmin && (
                  <span className={styles.adminBadge}>Admin</span>
                )}
                {/* If logged in user is group admin, allow removing non-admin users from group */}
                {!formattedMember.isAdmin && selectedGroup.code && (
                  <span className={styles.deleteIcon}>
                    <RemoveMemberFromGroup
                      groupId={groupId}
                      userId={formattedMember.userId}
                      onRefresh={onRefresh}
                    />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        // Display a message if there are no members
        <p>No members yet.</p>
      )}
    </div>
  );
};

export default GroupMemberList;
