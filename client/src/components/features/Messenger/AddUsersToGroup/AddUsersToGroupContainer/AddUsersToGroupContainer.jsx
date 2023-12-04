import React, { useEffect, useRef, useState } from "react";
import useGetGroupMembers from "../../../../../hooks/useGetGroupMembers";
import ErrorDisplay from "../../../../common/ErrorDisplay/ErrorDisplay";
import HelmetMetaTagsNetlify from "../../../../common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../../../common/PiratePxPageRender/PiratePxPageRender";
import ReactIconNavigate from "../../../../common/ReactIconNavigate/ReactIconNavigate";
import GroupMemberList from "../../GroupMemberList/GroupMemberList";
import AddUserToGroupForm from "../AddUserToGroupForm/AddUserToGroupForm";
import styles from "./AddUsersToGroupContainer.module.css";
import { HiMiniBackspace } from "react-icons/hi2";
import useUserContext from "../../../../../hooks/useUserContext";

/**
 * Container for adding users to a group.
 * @param {Object} props - Component props.
 * @param {function} props.onDefaultViewClick - Callback to set the default view.
 * @returns {JSX.Element} - Rendered component.
 */
const AddUsersToGroupContainer = ({ onDefaultViewClick }) => {
  // Create a selectedGroupRef to persist initial selectedGroup.groupId across renders
  const selectedGroupRef = useRef();

  // Get selectedGroup, groupId & userId from userContext
  const { groupId } = useUserContext().selectedGroup;
  const { userId } = useUserContext().user;
  const { selectedGroup } = useUserContext();
  // Set refreshTrigger state to rerender user list
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // Get group name and user list
  const { error, groupName, groupMembers } = useGetGroupMembers(
    groupId,
    refreshTrigger
  );

  // Change refreshTrigger to trigger useGetGroupMembers hook again after a user has been added
  const handleRefresh = () => {
    setRefreshTrigger((prev) => !prev);
  };

  // Set default view when selectedGroup ID does not match initial groupId
  useEffect(() => {
    if (
      // Check if there is a previous groupID stored in selectedGroupRef.current and if the current group ID (selectedGroup.groupId) is different from the previous one
      selectedGroupRef.current &&
      selectedGroup.groupId !== selectedGroupRef.current
    ) {
      // Render message default view
      onDefaultViewClick();
    }
  }, [selectedGroup, onDefaultViewClick]);

  // Update ref when selectedGroup changes
  useEffect(() => {
    selectedGroupRef.current = selectedGroup.groupId;
  }, [selectedGroup]);

  return (
    <div className={styles.addUsersContainer}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"add-user"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - add user' />
      <h1>{groupName}</h1>
      <AddUserToGroupForm
        groupId={groupId}
        userId={userId}
        onRefresh={handleRefresh}
      />
      <ErrorDisplay error={error} />
      {/* Render back button */}
      <ReactIconNavigate
        onClick={onDefaultViewClick}
        size={2.5}
        icon={HiMiniBackspace}
      />
      <GroupMemberList groupMembers={groupMembers} />
    </div>
  );
};

export default AddUsersToGroupContainer;
