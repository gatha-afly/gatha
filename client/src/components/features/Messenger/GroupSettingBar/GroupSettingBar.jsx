import React from "react";
import styles from "./GroupSettingBar.module.css";
import GroupAdminBar from "../GroupAdminBar/GroupAdminBar";

/**
 * Bar to host selected group related information and functionalities
 * @param {Object} props - The component props.
 * @param {Object} props.selectedGroup - The currently selected group by the user.
 * @returns {JSX.Element} - The rendered component.
 */
function GroupSettingBar({ selectedGroup }) {
  return (
    <div className={styles.barContainer}>
      {/* Render group name */}
      <h2 className={styles.groupName}>{selectedGroup.name}</h2>
      {/* Render admin bar if user is admin */}
      {selectedGroup.group_code && (
        <GroupAdminBar selectedGroup={selectedGroup} />
      )}
    </div>
  );
}

export default GroupSettingBar;
