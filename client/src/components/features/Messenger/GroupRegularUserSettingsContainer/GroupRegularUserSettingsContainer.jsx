import React from "react";
import styles from "./GroupRegularUserSettingsContainer.module.css";
import { HiMiniBackspace } from "react-icons/hi2";
import useGetGroupMembers from "../../../../hooks/useGetGroupMembers";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import PiratePxPageRender from "../../../common/PiratePxPageRender/PiratePxPageRender";
import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";
import GroupMemberList from "../GroupMemberList/GroupMemberList";
import useUserContext from "../../../../hooks/useUserContext";
import useSetCallbackWhenSelectedGroupChanges from "../../../../hooks/useSetCallbackWhenSelectedGroupChanges";
import { devLog } from "../../../../utils/errorUtils";
import LeaveGroup from "../LeaveGroup/LeaveGroup";

/**
 * Container for hosting regular user group settings
 * @param {Object} props - Component props.
 * @param {function} props.onDefaultViewClick - Callback to set the default view.
 * @returns {JSX.Element} - Rendered component.
 */
const GroupRegularUserSettingsContainer = ({ onDefaultViewClick }) => {
  // Get selectedGroup, groupId & userId from userContext
  const { groupId, name, description } = useUserContext().selectedGroup;
  const { userId } = useUserContext().user;
  const { selectedGroup } = useUserContext();
  const groupMembers = useGetGroupMembers(groupId);
  devLog("groupMembers:", groupMembers);
  devLog("selected group:", selectedGroup);
  // Set default view when selectedGroup ID does not match initial groupId
  useSetCallbackWhenSelectedGroupChanges(selectedGroup, onDefaultViewClick);

  return (
    <div className={styles.regularUserSettingsContainer}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"regular-user-settings"} />
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
      <LeaveGroup groupId={groupId} userId={userId} />
      <GroupMemberList groupMembers={groupMembers} />
    </div>
  );
};

export default GroupRegularUserSettingsContainer;
