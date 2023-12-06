import React, { useState } from "react";
import styles from "./GroupAdminBar.module.css";
import { IoPersonAddSharp } from "react-icons/io5";
import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";
import useSetActionWhenSelectedGroupChanges from "../../../../hooks/useSetActionWhenSelectedGroupChanges";

/**
 * Bar to host selected group admin related information and functionalities
 * @param {Object} props - The component props.
 * @param {Object} props.selectedGroup - The currently selected group by the user.
 * @returns {JSX.Element} - The rendered component.
 */
function GroupAdminBar({ selectedGroup, onAddUserClick }) {
  const [isGroupCodeVisible, setGroupCodeVisibility] = useState(false);

  const handleCodeClick = () => {
    setGroupCodeVisibility(!isGroupCodeVisible);
  };

  const hideGroupCode = () => {
    setGroupCodeVisibility(false);
  };
  // Hide groupCode if selectedGroup changes
  useSetActionWhenSelectedGroupChanges(selectedGroup, hideGroupCode);

  return (
    <div className={styles.barContainer}>
      {/* Render group code or clickable text based on visibility state */}
      {isGroupCodeVisible ? (
        <p className={styles.groupCode} onClick={handleCodeClick}>
          {selectedGroup.group_code}
        </p>
      ) : (
        <p className={styles.toggleText} onClick={handleCodeClick}>
          Show invitation code
        </p>
      )}

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
