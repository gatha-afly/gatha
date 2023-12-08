import React from "react";
import styles from "./GroupMemberList.module.css";

/**
 * Component to render the list of group members.
 * @param {Object} groupMembers - Object containing group information and an array of group members.
 * @param {Array} groupMembers.groupMembers - Array of group members.
 * @param {string} groupMembers.groupName - Name of the group.
 * @param {string|null} groupMembers.error - Error message, if any.
 */
const GroupMemberList = ({ groupMembers }) => {
  // Format members for desired display
  const formattedMembers = groupMembers.groupMembers.map((member) => {
    // Generate formatted member information
    const memberInfo = `${member.firstName} ${member.lastName} (${member.username})`;
    return {
      info: memberInfo,
      isAdmin: member.isAdmin,
    };
  });

  return (
    <div className={styles.renderMembers}>
      <h3>group members:</h3>
      {/* Check if there are members*/}
      {formattedMembers.length >= 1 ? (
        <ul>
          {/* Map through formatted members and display in a list */}
          {formattedMembers.map((formattedMember, index) => (
            <li key={index}>
              {/* Display member information */}
              {formattedMember.info}
              {/* Display admin badge if the member is an admin */}
              {formattedMember.isAdmin && (
                <span className={styles.adminBadge}>Admin</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        // Display a message if there are no members
        <p>No members yet.</p>
      )}
    </div>
  );
};

export default GroupMemberList;
