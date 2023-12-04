import { useNavigate } from "react-router-dom";
import useGetGroupData from "../../../../hooks/useGetGroupData";
import GroupnameInitial from "../../../common/GroupnameInitial/GroupnameInitial";
import styles from "./BasicGroupInfo.module.css";
import { isMobile } from "../../../../utils/deviceUtils";
import useUserContext from "../../../../hooks/useUserContext";

/**
 * Displays basic information about a group.
 * @param {Object} groupData - Data containing information about the group.
 */
const BasicGroupInfo = ({ userId, groupId }) => {
  // Get updateSelectedGroup from context
  const { updateSelectedGroup } = useUserContext();
  // Use useNavigate
  const navigate = useNavigate();
  // Fetch group information
  const response = useGetGroupData(groupId, userId);

  const { groupData } = response;
  // Destructure groupData and provide default values
  const { data } = groupData || {};
  const { name, description } = data || {};

  const handleClick = () => {
    if (groupData) {
      if (isMobile) {
        updateSelectedGroup(data);
        // Navigate to mobile messenger page if device is mobile
        navigate("/messenger-mobile");
      } else {
        updateSelectedGroup(data);
      }
    }
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

export default BasicGroupInfo;
