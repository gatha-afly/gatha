import useUserContext from "../../../../context//useUserContext";
import useGetGroupData from "../../../../hooks/useGetGroupData";
import GroupnameInitial from "../../../common/GroupnameInitial/GroupnameInitial";
import styles from "./RenderBasicGroupInfo.module.css";

/**
 * Displays basic information about a group.
 * @param {Object} groupData - Data containing information about the group.
 */

const RenderBasicGroupInfo = ({ userId, groupId }) => {
  // Move the selected groupId the the context to resue it on other components
  const { selectedGroupId, getGroupIdOnClick } = useUserContext();
  const response = useGetGroupData(selectedGroupId || groupId, userId);

  const { groupData } = response;
  // Destructure groupData and provide default values
  const { data } = groupData || {};
  const { name, description } = data || {};
  console.log(selectedGroupId);

  // Handle click on the group card
  const handleClick = () => {
    getGroupIdOnClick(groupId);
  };

  return (
    <div className={styles.groupInfoContainer} onClick={handleClick}>
      <div className={styles.initial}>
        <GroupnameInitial
          groupname={name}
          radius={3.8}
          fontSize={1.8}
          borderWidth={0.6}
        />
      </div>
      {/* Display the group name and description */}
      <div className={styles.infos}>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default RenderBasicGroupInfo;
