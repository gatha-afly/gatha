import React, { useEffect, useState } from "react";
import styles from "./MessengerContainer.module.css";
import RenderMessages from "../RenderMessages/RenderMessages";
import SendMessage from "../SendMessage/SendMessage";
import GroupSettingBar from "../GroupSettings/GroupSettingBar/GroupSettingBar";
import { FaRegHandPointLeft } from "react-icons/fa6";

import useUserContext from "../../../../hooks/useUserContext";
import PiratePxPageRender from "../../../common/PiratePxPageRender/PiratePxPageRender";
import GroupSettingsContainer from "../GroupSettings/GroupSettingsContainer/GroupSettingsContainer";
import useUpdateUserData from "../../../../hooks/useUpdateUser";

function MessengerContainer() {
  const { selectedGroup } = useUserContext();
  const { fetchUserUpdates } = useUpdateUserData();
  // State to track the current view
  const [currentView, setCurrentView] = useState("default");

  // FetchUserUpdates on mount component
  useEffect(() => {
    fetchUserUpdates();
  }, [fetchUserUpdates]);

  // FetchUserUpdates every 60 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchUserUpdates();
    }, 60000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [fetchUserUpdates]);

  // Function to switch the current view
  const switchView = (view) => {
    setCurrentView(view);
  };

  // Event handlers for changing the view
  const handleDefaultViewClick = () => {
    switchView("default");
  };

  const handleGroupSettingsClick = () => {
    switchView("groupSettings");
  };

  // Function to dynamically render different views based on the current view state
  const renderView = () => {
    switch (currentView) {
      // Render group settings with a callback for the default view
      case "groupSettings":
        return (
          <>
            <GroupSettingBar
              selectedGroup={selectedGroup}
              onBackClick={handleDefaultViewClick}
              view={"groupSettings"}
            />
            <GroupSettingsContainer
              onDefaultViewClick={handleDefaultViewClick}
            />
          </>
        );
      default:
        // Render default view with the latest messages of the selected group
        return selectedGroup ? (
          <>
            <PiratePxPageRender COUNT_IDENTIFIER={"messenger"} />
            <div className={styles.groupBar}>
              <GroupSettingBar
                view={"default"}
                selectedGroup={selectedGroup}
                onSettingsClick={handleGroupSettingsClick}
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
