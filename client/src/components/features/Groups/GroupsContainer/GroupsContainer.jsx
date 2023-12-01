import { useState } from "react";
import styles from "./GroupsContainer.module.css";
import CreateGroup from "../CreateGroup/CreateGroupContainer/CreateGroupContainer";
import JoinGroup from "../JoinGroup/JoinGroupContainer/JoinGroupContainer";
import GroupsManagementBar from "../../Groups/GroupsManagementBar/GroupsManagementBar";
import BasicGroupInfo from "../BasicGroupInfo/BasicGroupInfo";

/**
 * Manages different views, rendering the group selection, create and join group part of the main application based on the current state.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.user - The user object containing information about the user and its groups.
 * @returns {JSX.Element} The rendered GroupsContainer component.
 */

const GroupsContainer = ({ user }) => {
  // State to track the current view
  const [currentView, setCurrentView] = useState("default");

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
        return <CreateGroup onDefaultViewClick={handleDefaultViewClick} />;
      case "joinGroup":
        // Render JoinGroup component with a callback for the default view
        return <JoinGroup onDefaultViewClick={handleDefaultViewClick} />;
      default:
        // Render default view with a list of all of the user's groups
        return (
          <>
            <div className={styles.groupsList}>
              {/* Map through user's groups to display BasicGroupInfo */}
              {user.groups.map((group) => (
                <BasicGroupInfo
                  key={group._id}
                  userId={user.userId}
                  groupId={group._id}
                />
              ))}
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
