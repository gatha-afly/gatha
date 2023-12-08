import { useEffect, useState } from "react";
import styles from "./GroupsContainer.module.css";
import JoinGroup from "../JoinGroup/JoinGroupContainer/JoinGroupContainer";
import GroupsManagementBar from "../../Groups/GroupsManagementBar/GroupsManagementBar";
import BasicGroupInfo from "../BasicGroupInfo/BasicGroupInfo";
import CreateGroupContainer from "../CreateGroup/CreateGroupContainer/CreateGroupContainer";
import { FaRegHandPointDown } from "react-icons/fa6";
import useUpdateUserData from "../../../../hooks/useUpdateUser";
import useUserContext from "../../../../hooks/useUserContext";

/**
 * Manages different views, rendering the group selection, create and join group part of the main application based on the current state.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.user - The user object containing information about the user and its groups.
 * @returns {JSX.Element} The rendered GroupsContainer component.
 */

const GroupsContainer = ({ user }) => {
  // Get selectedGroup from context
  const { selectedGroup } = useUserContext();
  // Get user updates, loading, and error from custom hook
  const { fetchUserUpdates } = useUpdateUserData();
  // State to track the current view and the user's groups
  const [currentView, setCurrentView] = useState("default");
  const [userGroups, setUserGroups] = useState([]);

  // Fetch and update user data when the component mounts and when the selected group changes
  useEffect(() => {
    fetchUserUpdates();
  }, [fetchUserUpdates, selectedGroup]);

  // Fetch and update user groups when the component mounts and when the groups are updated
  useEffect(() => {
    setUserGroups(user.groups);
  }, [user.groups]);

  // Function to switch the current view
  const switchView = (view) => {
    setCurrentView(view);
  };

  // Event handlers for changing the view
  const handleDefaultViewClick = () => {
    switchView("default");
  };
  const handleCreateGroupClick = () => {
    switchView("createGroup");
  };
  const handleJoinGroupClick = () => {
    switchView("joinGroup");
  };

  // Function to dynamically render different views based on the current view state
  const renderView = () => {
    switch (currentView) {
      // Render CreateGroup component with a callback for the default view
      case "createGroup":
        return (
          <CreateGroupContainer onDefaultViewClick={handleDefaultViewClick} />
        );
      case "joinGroup":
        // Render JoinGroup component with a callback for the default view
        return <JoinGroup onDefaultViewClick={handleDefaultViewClick} />;
      default:
        // Render default view with a list of all of the user's groups
        return (
          <>
            <div className={styles.groupsList}>
              {userGroups.length > 0 ? (
                // Map through user's groups to display BasicGroupInfo
                userGroups.map((group) => (
                  <BasicGroupInfo
                    key={group._id}
                    userId={user.userId}
                    groupId={group._id}
                  />
                ))
              ) : (
                // Display message when there are no or only one group
                <p className={styles.cta}>
                  To get started, either create or join a group.
                  <div>
                    <FaRegHandPointDown />
                  </div>
                </p>
              )}
            </div>
            <div className={styles.groupBar}>
              <GroupsManagementBar
                onCreateGroupClick={handleCreateGroupClick}
                onJoinGroupClick={handleJoinGroupClick}
              />
            </div>
          </>
        );
    }
  };

  return <div className={styles.groupsContainer}>{renderView()}</div>;
};

export default GroupsContainer;
