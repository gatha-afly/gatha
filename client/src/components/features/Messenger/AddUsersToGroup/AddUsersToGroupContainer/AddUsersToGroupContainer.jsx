import React, { useState } from "react";
import useGetGroupMembers from "../../../../../hooks/useGetGroupMembers";
import AddUserToGroupForm from "../AddUserToGroupForm/AddUserToGroupForm";
import styles from "./AddUsersToGroupContainer.module.css";
import useUserContext from "../../../../../hooks/useUserContext";
import useSetCallbackWhenSelectedGroupChanges from "../../../../../hooks/useSetCallbackWhenSelectedGroupChanges";
import GroupMemberList from "../../GroupMemberList/GroupMemberList";

/**
 * Container for adding users to a group.
 * @param {Object} props - Component props.
 * @param {function} props.onDefaultViewClick - Callback to set the default view.
 * @returns {JSX.Element} - Rendered component.
 */
const AddUsersToGroupContainer = ({ onDefaultViewClick }) => {
  // Get selectedGroup, groupId & userId from userContext
  const { groupId } = useUserContext().selectedGroup;
  const { userId } = useUserContext().user;
  const { selectedGroup } = useUserContext();
  // Set refreshTrigger state to rerender user list
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // Get group name and user list
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
      {/* Render back button */}
      <GroupMemberList
        groupId={groupId}
        groupMembers={groupMembers}
        onRefresh={handleRefresh}
      />
    </div>
  );
};

export default AddUsersToGroupContainer;
