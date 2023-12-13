import React, { useState } from "react";
import styles from "./GroupSettingsContainer.module.css";
import useUserContext from "../../../../../hooks/useUserContext";
import PiratePxPageRender from "../../../../common/PiratePxPageRender/PiratePxPageRender";
import { devLog } from "../../../../../utils/errorUtils";
import useSetCallbackWhenSelectedGroupChanges from "../../../../../hooks/useSetCallbackWhenSelectedGroupChanges";
import AddUsersToGroupContainer from "../AddUsersToGroup/AddUsersToGroupContainer/AddUsersToGroupContainer";
import GroupMemberList from "../GroupMemberList/GroupMemberList";
import LeaveGroup from "../LeaveGroup/LeaveGroup";
import { userAPI } from "../../../../../api/userAPI";
import GroupDetailsEditor from "../GroupDetailsEditor/GroupDetailsEditor";
import useGetGroupMembers from "../../../../../hooks/useGetGroupMembers";
import CopyToClipboard from "../../../../common/CopyToClipboard/CopyToClipboard";
import ReactIconNavigate from "../../../../common/ReactIconNavigate/ReactIconNavigate";
import { FaEdit } from "react-icons/fa";

/**
 * Container for rendering group settings
 * @param {Object} props - Component props.
 * @param {function} props.onDefaultViewClick - Callback to set the default view.
 * @returns {JSX.Element} - Rendered component.
 */
const GroupSettingsContainer = ({ onDefaultViewClick }) => {
  // Get selectedGroup, groupId & userId from userContext
  const { groupId } = useUserContext().selectedGroup;
  const { userId } = useUserContext().user;
  const { selectedGroup } = useUserContext();
  const userIsGroupAdmin = selectedGroup && selectedGroup.code;
  const groupMembers = useGetGroupMembers(groupId);

  // State for managing editing mode and dynamic data
  const [editingName, setEditingName] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [name, setName] = useState(selectedGroup.name);
  const [description, setDescription] = useState(selectedGroup.description);

  // Function to handle changing group details
  const handleChangeGroupDetails = async (editedValue, field) => {
    try {
      const response = await userAPI.patch(
        `/groups/edit-group/${groupId}/${userId}`,
        { [field]: editedValue }
      );

      // Update the state with the new values from the response
      if (field === "name") {
        devLog("response", response);
        setName(response.data.editedGroup.name);
        devLog("groupname", name);
      } else if (field === "description") {
        setDescription(response.data.editedGroup.description);
        devLog("description", description);
      }

      devLog(`Group ${field} updated:`, response);
    } catch (error) {
      console.log(`Error updating group ${field}:`, error);
    } finally {
      // Exit editing mode
      field === "name" ? setEditingName(false) : setEditingDescription(false);
    }
  };

  devLog("selectedGroup:", selectedGroup);

  // Set default view when selectedGroup ID does not match initial groupId
  useSetCallbackWhenSelectedGroupChanges(selectedGroup, onDefaultViewClick);

  return (
    <div className={styles.settings}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"user-settings"} />
      {/* Render group name and group description based on userIsGroupAdmin */}
      {userIsGroupAdmin ? (
        <>
          {/* Edit group name */}
          <div className={styles.groupName}>
            <h2>group name:</h2>
            {editingName ? (
              <GroupDetailsEditor
                value={name}
                onSave={(editedValue) =>
                  handleChangeGroupDetails(editedValue, "name")
                }
                onCancel={() => setEditingName(false)}
                groupId={groupId}
                userId={userId}
                maxCharacters={20}
              />
            ) : (
              <p className={styles.info} onClick={() => setEditingName(true)}>
                {name}
                <span className={styles.icon}>
                  <ReactIconNavigate icon={FaEdit} size={1.6} margin={0} />
                </span>
              </p>
            )}
          </div>

          {/* Edit group description */}
          <div>
            <h2>group description:</h2>
            {editingDescription ? (
              <GroupDetailsEditor
                value={description}
                onSave={(editedValue) =>
                  handleChangeGroupDetails(editedValue, "description")
                }
                onCancel={() => setEditingDescription(false)}
                groupId={groupId}
                userId={userId}
                maxCharacters={100}
              />
            ) : (
              <p
                className={styles.info}
                onClick={() => setEditingDescription(true)}
              >
                {description ? description : "No group description entered."}
                <span className={styles.icon}>
                  <ReactIconNavigate icon={FaEdit} size={1.6} margin={0} />
                </span>
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Display group name without ability to edit */}
          <div className={styles.groupName}>
            <h2>group name:</h2>
            <p>{name}</p>
          </div>

          {/* Display group description without ability to edit */}
          <div>
            <h2>group description:</h2>
            <p className={styles.groupDescription}>
              {description ? description : "No group description entered."}
            </p>
          </div>
        </>
      )}

      {userIsGroupAdmin && (
        <div className={styles.groupCode}>
          <h2>group code:</h2>
          <CopyToClipboard infoToCopy={selectedGroup.code} />
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
