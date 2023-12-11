// GroupBar.jsx
import React from "react";
import styles from "./GroupsManagementBar.module.css";
import { LuLink } from "react-icons/lu";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";

/**
 * GroupsManagementBar Component
 *
 * Bar for managing groups, ie allowing users to create
 * and join groups.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onCreateGroupClick - Callback function for creating a new group.
 * @param {Function} props.onJoinGroupClick - Callback function for joining an existing group.
 * @returns {JSX.Element} The rendered GroupsManagementBar component.
 */
function GroupsManagementBar({ onCreateGroupClick, onJoinGroupClick }) {
  return (
    <div className={styles.groupBar}>
      <ReactIconNavigate
        onClick={onCreateGroupClick}
        size={3}
        icon={AiOutlineUsergroupAdd}
        tooltip={"create group"}
        tooltipSize={1.6}
      />
      <ReactIconNavigate
        onClick={onJoinGroupClick}
        size={2.5}
        icon={LuLink}
        tooltip={"join group"}
        tooltipSize={1.6}
      />
    </div>
  );
}

export default GroupsManagementBar;
