import React, { useState } from "react";
import styles from "./AddUsersToGroupContainer.module.css";
import useSetCallbackWhenSelectedGroupChanges from "@hooks/useSetCallbackWhenSelectedGroupChanges";
import useGetGroupMembers from "@hooks/useGetGroupMembers";
import AddUserToGroupForm from "../AddUserToGroupForm/AddUserToGroupForm";
import GroupMemberList from "../../GroupMemberList/GroupMemberList";
import useUserContext from "@hooks/useUserContext";
/**
 * Container for group admins for adding users to a group.
 * @component
 * @param {Object} props - Component props.
 * @param {function} props.onDefaultViewClick - Callback to set the default view.
 * @param {string} props.groupId - The ID of the group.
 * @param {string} props.userId - The ID of the user.
 * @param {boolean} props.userIsGroupAdmin - Indicator whether the user is admin of the group.
 * @returns {JSX.Element} - Rendered component.
 */
const AddUsersToGroupContainer = ({
  onDefaultViewClick,
  groupId,
  userId,
  userIsGroupAdmin,
}) => {
  // Get selectedGroup, groupId & userId from userContext
  const { selectedGroup } = useUserContext();
  // Set refreshTrigger state to rerender user list
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // Get groupMembers
  const groupMembers = useGetGroupMembers(groupId, refreshTrigger);

  // Change refreshTrigger to trigger useGetGroupMembers hook again after a user has been added
  const handleRefresh = () => {
    setRefreshTrigger((prev) => !prev);
  };

  // Set default view when selectedGroup ID does not match initial groupId
  useSetCallbackWhenSelectedGroupChanges(selectedGroup, onDefaultViewClick);

  return (
    <div className={styles.addUsersContainer}>
      <h2>add members:</h2>
      <AddUserToGroupForm
        groupId={groupId}
        userId={userId}
        onRefresh={handleRefresh}
      />
      {/* Render GroupMemberList when fetched */}
      {groupMembers && (
        <GroupMemberList
          groupId={groupId}
          groupMembers={groupMembers}
          onRefresh={handleRefresh}
          userIsGroupAdmin={userIsGroupAdmin}
        />
      )}
    </div>
  );
};

export default AddUsersToGroupContainer;
