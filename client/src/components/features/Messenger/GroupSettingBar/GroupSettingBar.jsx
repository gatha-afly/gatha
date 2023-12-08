import React from "react";
import styles from "./GroupSettingBar.module.css";
import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";
import { IoSettingsOutline } from "react-icons/io5";
import ViewGroupCode from "../ViewGroupCode/ViewGroupCode";

/**
 * Bar to host selected group related information and functionalities
 * @param {Object} props - The component props.
 * @param {Object} props.selectedGroup - The currently selected group by the user.
 * @returns {JSX.Element} - The rendered component.
 */
function GroupSettingBar({
  selectedGroup,
  onAdminSettingsClick,
  onRegularUserSettingsClick,
}) {
  const { name } = selectedGroup;

  return (
    <div className={styles.barContainer}>
      {/* Render group name */}
      <h2 className={styles.groupName}>{name}</h2>
      {/* Render admin bar if user is admin */}
      {selectedGroup.code && <ViewGroupCode selectedGroup={selectedGroup} />}
      {/* Render group settings icon, view admin settings on click if user is admin, else view regular user settings on click*/}
      <div className={styles.settingsIcon}>
        <ReactIconNavigate
          onClick={
            selectedGroup.code
              ? onAdminSettingsClick
              : onRegularUserSettingsClick
          }
          size={2.5}
          icon={IoSettingsOutline}
        />
      </div>
    </div>
  );
}

export default GroupSettingBar;
