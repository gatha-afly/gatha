import { useState } from "react";
import { userAPI } from "../../../../api/userAPI";
import { devLog } from "../../../../utils/errorUtils";
import styles from "./RemoveMemberFromGroup.module.css";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";
import { CiCircleRemove } from "react-icons/ci";
import useUserContext from "../../../../hooks/useUserContext";

/**
 * Renders a react-icon to remove a user from a group.
 * @param {string} groupId - ID of the group.
 * @param {string} userId - ID of the to be removed user.
 */
const RemoveMemberFromGroup = ({ groupId, userId, onRefresh }) => {
  // State to handle error messages
  const [error, setError] = useState("");

  // Get the adminId (= id of the loggedIn user) from the user context
  const {
    user: { userId: adminId },
  } = useUserContext();

  const handleRemoveMember = async () => {
    try {
      // Make a PATCH request to remove the member from the group
      const response = await userAPI.patch(
        `/groups/remove-member/${groupId}/${adminId}/${userId}`
      );
      devLog(response);
      onRefresh();
    } catch (error) {
      devLog(error);
      // Set an error message to be displayed
      setError("An error occurred while removing the member from the group.");
    }
  };

  return (
    <div>
      {/* Render react-icon for removing the member and handle the click event */}
      <ReactIconNavigate
        icon={CiCircleRemove}
        onClick={handleRemoveMember}
        size={1.7}
      />
      {/* Display an error message if there's an error */}
      {error && <ErrorDisplay error={error} />}
    </div>
  );
};

export default RemoveMemberFromGroup;
