// GroupBar.jsx
import React from "react";
import styles from "./GroupSettingBar.module.css";

function GroupSettingBar({ selectedGroup }) {
  return (
    <div className={styles.barContainer}>
      <h2>{selectedGroup.name}</h2>
    </div>
  );
}

export default GroupSettingBar;
