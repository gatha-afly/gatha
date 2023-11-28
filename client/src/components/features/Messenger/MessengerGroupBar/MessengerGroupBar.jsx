// GroupBar.jsx
import React from "react";
import styles from "./MessengerGroupBar.module.css";

function MessengerGroupBar({ selectedGroup }) {
  return (
    <div className={styles.barContainer}>
      <h2>{selectedGroup.name}</h2>
    </div>
  );
}

export default MessengerGroupBar;
