import React from "react";
import styles from "./OnlineStatusIndicator.module.css";

/**
 * OnlineStatusIndicator component to display the online/offline status of a user.
 * @param {Object} props - Component props.
 * @param {boolean} props.isOnline - Indicates whether the user is online.
 * @returns {JSX.Element} - Rendered component.
 */
const OnlineStatusIndicator = ({ isOnline }) => {
  return (
    // Apply CSS class based on the online status
    <div
      className={`${styles.statusIndicator} ${
        isOnline ? styles.online : styles.offline
      }`}>
      <span>{isOnline ? "online" : "offline"}</span>
    </div>
  );
};
export default OnlineStatusIndicator;
