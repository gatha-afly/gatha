import RenderBasicGroupInfo from "../BasicGroupInfo/RenderBasicGroupInfo/RenderBasicGroupInfo";
import styles from "./GroupsList.module.css";

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
  // Retrieve user information
  const userId = user.userId;
  const groupIds = user.groups.map((group) => group._id);

  return (
    <div className={styles.container}>
      {/* Render RenderBasicGroupInfo for each groupId in the array */}
      {groupIds.map((groupId) => (
        <RenderBasicGroupInfo key={groupId} userId={userId} groupId={groupId} />
      ))}
    </div>
  );
};

export default GroupsList;
