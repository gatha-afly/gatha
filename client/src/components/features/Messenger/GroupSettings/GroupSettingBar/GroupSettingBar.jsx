import React from "react";
import styles from "./GroupSettingBar.module.css";
import ReactIconNavigate from "../../../../common/ReactIconNavigate/ReactIconNavigate";
import { IoSettingsOutline } from "react-icons/io5";
import { MdGroups2 } from "react-icons/md";
import { HiMiniBackspace } from "react-icons/hi2";
import { isMobile } from "../../../../../utils/deviceUtils";
import useUserContext from "../../../../../hooks/useUserContext";

/**
 * Bar component to display selected group-related information and functionalities.
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.view - The current view ("default" or "groupSettings").
 * @param {Object} props.selectedGroup - The currently selected group by the user.
 * @param {Function} props.onSettingsClick - Callback function for handling group settings click.
 * @param {Function} props.onBackClick - Callback function for handling back button click.
 * @returns {JSX.Element} - The rendered component.
 */
function GroupSettingBar({
  view,
  selectedGroup,
  onSettingsClick,
  onBackClick,
}) {
  // Extract the name of the selected group from user context
  const { name } = useUserContext().selectedGroup;

  return (
    <div className={styles.barContainer}>
      {/* Render content based on the view prop */}
      {view === "default" && (
        <>
          {/* Render mobile home icon if the device is mobile */}
          {isMobile && (
            <span className={styles.mobileHome}>
              <ReactIconNavigate
                route='/main'
                size={2.4}
                icon={MdGroups2}
                margin={0}
              />
            </span>
          )}
          {/* Placeholder correct element alignment */}
          <span></span>
          {/* Display the group name */}
          <h2 className={styles.groupName}>{name}</h2>
          {/* Render settings icon */}
          <span className={styles.settings}>
            <ReactIconNavigate
              onClick={onSettingsClick}
              size={2.5}
              icon={IoSettingsOutline}
              margin={0}
            />
          </span>
        </>
      )}

      {view === "groupSettings" && (
        <>
          {/* Display the title for the group settings view */}
          <h2>group settings</h2>
          {/* Render back icon with callback function for navigating back */}
          <div className={styles.backIcon}>
            <ReactIconNavigate
              onClick={onBackClick}
              size={2.4}
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
