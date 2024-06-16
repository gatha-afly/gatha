import { useNavigate } from "react-router-dom";
import styles from "./BasicGroupInfo.module.css";
import useGetGroupData from "@hooks/useGetGroupData";
import GroupnameInitial from "@common/GroupnameInitial/GroupnameInitial";
import { isMobile } from "@utils/deviceUtils";
import useUserContext from "@hooks/useUserContext";

/**
 * Renders group name and group description, updates selectedGroup upon user click
 * @param {Object} groupData - Data containing information about the group.
 */
const BasicGroupInfo = ({ userId, groupId, groupName, groupDescription }) => {
  // Get updateSelectedGroup from context
  const { updateSelectedGroup } = useUserContext();
  // Use useNavigate
  const navigate = useNavigate();

  // Fetch group information
  const response = useGetGroupData(groupId, userId);
  const { groupData } = response;

  // Update selectedGroup to render that group in messenger / navigates to mobile messenger if mobile device
  const handleClick = () => {
    if (groupData) {
      if (isMobile) {
        updateSelectedGroup(groupData.data);
        // Navigate to mobile messenger page if device is mobile
        navigate("/messenger-mobile");
      } else {
        updateSelectedGroup(groupData.data);
      }
    }
  };

  return (
    <div className={styles.groupInfoContainer} onClick={handleClick}>
      <div className={styles.initial}>
        <GroupnameInitial
          groupname={groupName}
          radius={3.8}
          fontSize={1.8}
          borderWidth={0.6}
        />
      </div>
      {/* Display the group name and description */}
      <div className={styles.infos}>
        <h2>{groupName}</h2>
        <p>{groupDescription}</p>
      </div>
    </div>
  );
};

export default BasicGroupInfo;
