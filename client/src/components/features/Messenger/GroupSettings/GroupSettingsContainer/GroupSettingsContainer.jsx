import React from "react";
import styles from "./GroupSettingsContainer.module.css";
import { HiMiniBackspace } from "react-icons/hi2";
import useUserContext from "../../../../../hooks/useUserContext";
import PiratePxPageRender from "../../../../common/PiratePxPageRender/PiratePxPageRender";
import ReactIconNavigate from "../../../../common/ReactIconNavigate/ReactIconNavigate";
import { devLog } from "../../../../../utils/errorUtils";
import useSetCallbackWhenSelectedGroupChanges from "../../../../../hooks/useSetCallbackWhenSelectedGroupChanges";
import AddUsersToGroupContainer from "../AddUsersToGroup/AddUsersToGroupContainer/AddUsersToGroupContainer";
import ViewGroupCode from "../ViewGroupCode/ViewGroupCode";
import GroupMemberList from "../GroupMemberList/GroupMemberList";
import useGetGroupMembers from "../../../../../hooks/useGetGroupMembers";
import LeaveGroup from "../LeaveGroup/LeaveGroup";
/**
 * Container for rendering group settings
 * @param {Object} props - Component props.
 * @param {function} props.onDefaultViewClick - Callback to set the default view.
 * @returns {JSX.Element} - Rendered component.
 */
const GroupSettingsContainer = ({ onDefaultViewClick }) => {
  // Get selectedGroup, groupId & userId from userContext
  const { groupId, name, description } = useUserContext().selectedGroup;
  const { userId } = useUserContext().user;
  const { selectedGroup } = useUserContext();
  const userIsGroupAdmin = selectedGroup && selectedGroup.code;
  devLog("selectedGroup:", selectedGroup);
  const groupMembers = useGetGroupMembers(groupId);

  // Set default view when selectedGroup ID does not match initial groupId
  useSetCallbackWhenSelectedGroupChanges(selectedGroup, onDefaultViewClick);

  return (
    <div className={styles.settings}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"user-settings"} />
      {/* Render back button */}
      <ReactIconNavigate
        onClick={onDefaultViewClick}
        size={2.5}
        icon={HiMiniBackspace}
      />
      <div className={styles.groupName}>
        <h2>group name:</h2>
        <p>{name}</p>
      </div>
      <div>
        <h2>group description:</h2>
        <p className={styles.groupDescription}>{description}</p>
      </div>
      {userIsGroupAdmin && (
        <div>
          <h2>group code:</h2>
          <ViewGroupCode selectedGroup={selectedGroup} />
        </div>
      )}

      <LeaveGroup
        groupId={groupId}
        userId={userId}
        onDefaultViewClick={onDefaultViewClick}
      />

      {userIsGroupAdmin ? (
        // Render the component to add users to the group only if the user is the group admin
        <AddUsersToGroupContainer
          onDefaultViewClick={onDefaultViewClick}
          groupId={groupId}
          userId={userId}
          userIsGroupAdmin={userIsGroupAdmin}
        />
      ) : (
        // Render the GroupMemberList component only if the user is not the group admin
        <GroupMemberList
          groupMembers={groupMembers}
          userIsGroupAdmin={userIsGroupAdmin}
        />
      )}
    </div>
  );
};

export default GroupSettingsContainer;
