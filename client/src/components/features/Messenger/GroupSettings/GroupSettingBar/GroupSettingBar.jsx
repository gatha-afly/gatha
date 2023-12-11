import React from "react";
import styles from "./GroupSettingBar.module.css";
import ReactIconNavigate from "../../../../common/ReactIconNavigate/ReactIconNavigate";
import { IoSettingsOutline } from "react-icons/io5";
import ViewGroupCode from "../ViewGroupCode/ViewGroupCode";
import { MdGroups2 } from "react-icons/md";
import { HiMiniBackspace } from "react-icons/hi2";

import { isMobile } from "../../../../../utils/deviceUtils";

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

          {isMobile && (
            <span className={styles.mobileHome}>
              <ReactIconNavigate
                route='/main'
                size={2.5}
                icon={MdGroups2}
                margin={0}
              />
            </span>
          )}
          <div className={styles.icons}>
            {selectedGroup.code && (
              <span className={styles.groupCode}>
                <ViewGroupCode selectedGroup={selectedGroup} />
              </span>
            )}
            <span className={styles.settings}>
              <ReactIconNavigate
                onClick={onSettingsClick}
                size={2.5}
                icon={IoSettingsOutline}
                margin={0}
              />
            </span>
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
