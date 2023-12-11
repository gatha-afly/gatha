import React from "react";
import styles from "./GroupSettingBar.module.css";
import ReactIconNavigate from "../../../../common/ReactIconNavigate/ReactIconNavigate";
import { IoSettingsOutline } from "react-icons/io5";
import ViewGroupCode from "../ViewGroupCode/ViewGroupCode";
import { HiMiniBackspace } from "react-icons/hi2";

/**
 * Bar to host selected group related information and functionalities
 * @param {Object} props - The component props.
 * @param {string} props.view - The current view ("default" or "groupSettings").
 * @param {Object} props.selectedGroup - The currently selected group by the user.
 * @param {Function} props.onGroupSettingsClick - Callback function for handling group settings click.
 * @returns {JSX.Element} - The rendered component.
 */
function GroupSettingBar({
  view,
  selectedGroup,
  onSettingsClick,
  onBackClick,
}) {
  const { name } = selectedGroup;

  return (
    <div className={styles.barContainer}>
      {/* Render content based on the view prop */}
      {view === "default" && (
        <>
          <h2 className={styles.groupName}>{name}</h2>
          {/* Render admin bar if user is admin */}
          {selectedGroup.code && (
            <ViewGroupCode selectedGroup={selectedGroup} />
          )}

          {/* Render group settings icon, view admin settings on click if user is admin */}
          <div className={styles.settingsIcon}>
            <ReactIconNavigate
              onClick={onSettingsClick}
              size={2.5}
              icon={IoSettingsOutline}
              margin={0}
            />
          </div>
        </>
      )}

      {view === "groupSettings" && (
        <>
          <h2>group settings</h2>
          <div className={styles.backIcon}>
            <ReactIconNavigate
              onClick={onBackClick}
              size={2.5}
              icon={HiMiniBackspace}
              margin={0}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default GroupSettingBar;
