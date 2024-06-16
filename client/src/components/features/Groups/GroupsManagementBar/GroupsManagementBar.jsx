import { LuLink } from "react-icons/lu";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import styles from "./GroupsManagementBar.module.css";
import ReactIconNavigate from "@common/ReactIconNavigate/ReactIconNavigate";

/**
 *
 * Bar component for managing groups, rendering appropriate views in parent component
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onCreateGroupClick - Callback function for changing view in parent component to render creating a new group.
 * @param {Function} props.onJoinGroupClick - Callback function for changing view in parent component to render  joining an existing group.
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
        margin={0}
        tooltipSize={1.6}
      />
      <ReactIconNavigate
        onClick={onJoinGroupClick}
        size={2.5}
        icon={LuLink}
        tooltip={"join group"}
        tooltipSize={1.6}
        margin={0.2}
      />
    </div>
  );
}

export default GroupsManagementBar;
