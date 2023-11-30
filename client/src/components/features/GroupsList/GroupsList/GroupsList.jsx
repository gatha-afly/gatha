import { useState } from "react";
import styles from "./GroupsList.module.css";
import GroupsManagementBar from "../GroupsManagementBar/GroupsManagementBar";
import RenderBasicGroupInfo from "../BasicGroupInfo/RenderBasicGroupInfo/RenderBasicGroupInfo";
import CreateGroup from "../../CreateGroup/CreateGroup";
import JoinGroup from "../../SearchGroupAndJoin/JoinGroup/JoinGroup";

/**
 * Renders a list of all the user's groups with basic information for each.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.user - The user object containing user information.
 * @param {string} props.user.userId - The unique identifier for the user.
 * @param {Array} props.user.groups - An array of user's groups.
 * @returns {JSX.Element} The rendered React element.
 *  */

const GroupsList = ({ user }) => {
  const [currentView, setCurrentView] = useState("default"); // "default", "createGroup", "joinGroup"

  const switchView = (view) => {
    setCurrentView(view);
  };

  const handleDefaultViewClick = () => {
    switchView("default");
  };

  const handleCreateGroupClick = () => {
    switchView("createGroup");
  };

  const handleJoinGroupClick = () => {
    switchView("joinGroup");
  };

  const renderView = () => {
    switch (currentView) {
      case "createGroup":
        return (
          <section className='createGroup'>
            <CreateGroup onDefaultViewClick={handleDefaultViewClick} />
          </section>
        );
      case "joinGroup":
        return <JoinGroup onDefaultViewClick={handleDefaultViewClick} />;
      default:
        return (
          <section className='default'>
            <div className={styles.groupContainer}>
              {user.groups.map((group) => (
                <RenderBasicGroupInfo
                  key={group._id}
                  userId={user.userId}
                  groupId={group._id}
                />
              ))}
            </div>
            <div className={styles.groupBar}>
              <GroupsManagementBar
                onCreateGroupClick={handleCreateGroupClick}
                onJoinGroupClick={handleJoinGroupClick}
              />
            </div>
          </section>
        );
    }
  };

  return <div className={styles.groupsList}>{renderView()}</div>;
};

export default GroupsList;
