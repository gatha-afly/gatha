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
import useSetActionWhenSelectedGroupChanges from "../../../../../hooks/useSetActionWhenSelectedGroupChanges";

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
  const { error, groupName, groupMembers } = useGetGroupMembers(
    groupId,
    refreshTrigger
  );

  // Change refreshTrigger to trigger useGetGroupMembers hook again after a user has been added
  const handleRefresh = () => {
    setRefreshTrigger((prev) => !prev);
  };

  // Set default view when selectedGroup ID does not match initial groupId
  useSetActionWhenSelectedGroupChanges(selectedGroup, onDefaultViewClick);

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
