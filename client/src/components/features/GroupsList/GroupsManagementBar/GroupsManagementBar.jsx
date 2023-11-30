// GroupBar.jsx
import React from "react";
import styles from "./GroupsManagementBar.module.css";
import { LuLink } from "react-icons/lu";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";

function GroupsManagementBar({ onCreateGroupClick, onJoinGroupClick }) {
  return (
    <div className={styles.groupBar}>
      <ReactIconNavigate
        onClick={onCreateGroupClick}
        size={3}
        icon={AiOutlineUsergroupAdd}
      />
      <ReactIconNavigate onClick={onJoinGroupClick} size={3} icon={LuLink} />
    </div>
  );
}

export default GroupsManagementBar;
