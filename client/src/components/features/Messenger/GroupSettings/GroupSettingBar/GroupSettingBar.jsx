import React from "react";
import styles from "./GroupSettingBar.module.css";
import ReactIconNavigate from "../../../../common/ReactIconNavigate/ReactIconNavigate";
import { IoSettingsOutline } from "react-icons/io5";
import { MdGroups2 } from "react-icons/md";
import { HiMiniBackspace } from "react-icons/hi2";
import { isMobile } from "../../../../../utils/deviceUtils";
import useGetGroupData from "../../../../../hooks/useGetGroupData";
import useUserContext from "../../../../../hooks/useUserContext";
import { devLog } from "../../../../../utils/errorUtils";

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
  const { groupId } = useUserContext().selectedGroup;
  const { userId } = useUserContext().user;
  const response = useGetGroupData(groupId, userId);

  const name = response.groupData?.data?.name || devLog("response:", response);

  return (
    <div className={styles.barContainer}>
      {/* Render content based on the view prop */}
      {view === "default" && (
        <>
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

          <span></span>

          <h2 className={styles.groupName}>{name}</h2>

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
          <h2>group settings</h2>
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
