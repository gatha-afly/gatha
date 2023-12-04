import React, { useState } from "react";
import styles from "./MessengerContainer.module.css";
import RenderMessages from "../RenderMessages/RenderMessages";
import SendMessage from "../SendMessage/SendMessage";
import GroupSettingBar from "../GroupSettingBar/GroupSettingBar";
import AddUsersToGroupContainer from "../AddUsersToGroup/AddUsersToGroupContainer/AddUsersToGroupContainer";
import { FaRegHandPointLeft } from "react-icons/fa6";
import useUserContext from "../../../../hooks/useUserContext";

function MessengerContainer() {
  const { selectedGroup } = useUserContext();

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
  const handleAddUserClick = () => {
    switchView("addUser");
  };

  // Function to dynamically render different views based on the current view state
  const renderView = () => {
    switch (currentView) {
      // Render addUser component with a callback for the default view
      case "addUser":
        return (
          <AddUsersToGroupContainer
            onDefaultViewClick={handleDefaultViewClick}
            selectedGroup={selectedGroup}
          />
        );
      default:
        // Render default view with the latest messages of the selected group
        return selectedGroup ? (
          <>
            <div className={styles.groupBar}>
              <GroupSettingBar
                selectedGroup={selectedGroup}
                onAddUserClick={handleAddUserClick}
              />
            </div>
            <div className={styles.messages}>
              <RenderMessages selectedGroup={selectedGroup} />
            </div>
            <div className={styles.send}>
              <SendMessage selectedGroup={selectedGroup} />
            </div>
          </>
        ) : (
          <>
            <div className={styles.selectGroup}>
              <p>Please select a group.</p>
              <FaRegHandPointLeft />
            </div>
          </>
        );
    }
  };

  return <div className={styles.messengerContainer}>{renderView()}</div>;
}

export default MessengerContainer;
