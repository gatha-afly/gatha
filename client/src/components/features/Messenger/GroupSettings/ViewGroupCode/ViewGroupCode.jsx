import React, { useState } from "react";
import styles from "./ViewGroupCode.module.css";
import useSetCallbackWhenSelectedGroupChanges from "../../../../../hooks/useSetCallbackWhenSelectedGroupChanges";

/**
 * Bar to host selected group admin related information and functionalities
 * @param {Object} props - The component props.
 * @param {Object} props.selectedGroup - The currently selected group by the user.
 * @returns {JSX.Element} - The rendered component.
 */
function ViewGroupCode({ selectedGroup, onAddUserClick }) {
  const [isGroupCodeVisible, setGroupCodeVisibility] = useState(false);

  const handleCodeClick = () => {
    setGroupCodeVisibility(!isGroupCodeVisible);
  };

  const hideGroupCode = () => {
    setGroupCodeVisibility(false);
  };
  // Hide groupCode if selectedGroup changes
  useSetCallbackWhenSelectedGroupChanges(selectedGroup, hideGroupCode);

  return (
    <div className={styles.barContainer}>
      {/* Render group code or clickable text based on visibility state */}
      {isGroupCodeVisible ? (
        <p className={styles.groupCode} onClick={handleCodeClick}>
          {selectedGroup.code}
        </p>
      ) : (
        <p className={styles.toggleText} onClick={handleCodeClick}>
          show code
        </p>
      )}
    </div>
  );
}

export default ViewGroupCode;
