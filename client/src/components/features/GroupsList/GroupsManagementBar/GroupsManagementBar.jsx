// GroupBar.jsx
import React from "react";
import styles from "./GroupsManagementBar.module.css";
import { GrGroup } from "react-icons/gr";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";

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
