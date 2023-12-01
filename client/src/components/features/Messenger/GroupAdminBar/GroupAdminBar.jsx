import React from "react";
import styles from "./GroupAdminBar.module.css";
import { IoPersonAddSharp } from "react-icons/io5";
import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";

/**
 * Bar to host selected group admin related information and functionalities
 * @param {Object} props - The component props.
 * @param {Object} props.selectedGroup - The currently selected group by the user.
 * @returns {JSX.Element} - The rendered component.
 */
function GroupAdminBar({ selectedGroup, onAddUserClick }) {
  return (
    <div className={styles.barContainer}>
      {/* Render group code */}
      <h3 className={styles.groupCode}>
        Invite code: {selectedGroup.group_code}
      </h3>
      {/* Render button to view add users to group */}
      <ReactIconNavigate
        onClick={onAddUserClick}
        size={1.5}
        icon={IoPersonAddSharp}
      />
    </div>
  );
}

export default GroupAdminBar;
