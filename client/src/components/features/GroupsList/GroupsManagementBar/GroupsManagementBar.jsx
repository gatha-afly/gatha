// GroupBar.jsx
import React from "react";
import styles from "./GroupsManagementBar.module.css";
import { FaPlusSquare } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";

function GroupsManagementBar({ onCreateGroupClick, onJoinGroupClick }) {
  return (
    <div className={styles.groupBar}>
      <ReactIconNavigate
        onClick={onCreateGroupClick}
        size={3}
        icon={FaPlusSquare}
      />
      <ReactIconNavigate onClick={onJoinGroupClick} size={3} icon={MdSearch} />
    </div>
  );
}

export default GroupsManagementBar;
