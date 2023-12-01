// GroupBar.jsx
import React from "react";
import styles from "./GroupsManagementBar.module.css";
import { GrGroup } from "react-icons/gr";
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
      <ReactIconNavigate onClick={onCreateGroupClick} size={3} icon={GrGroup} />
      <ReactIconNavigate
        onClick={onJoinGroupClick}
        size={3}
        icon={AiOutlineUsergroupAdd}
      />
    </div>
  );
}

export default GroupsManagementBar;
