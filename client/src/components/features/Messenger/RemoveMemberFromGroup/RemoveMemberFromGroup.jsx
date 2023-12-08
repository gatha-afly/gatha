import { useState } from "react";
import { userAPI } from "../../../../api/userAPI";
import useUpdateUserData from "../../../../hooks/useUpdateUser";
import { devLog } from "../../../../utils/errorUtils";
import styles from "./RemoveMemberFromGroup.module.css";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";
import { CiCircleRemove } from "react-icons/ci";

/**
 * Renders an icon to remove a user from a group.
 * @param {string} groupId - ID of the group.
 * @param {string} userId - ID of the to be removed user.
 */
const RemoveMemberFromGroup = ({ groupId, userId }) => {
  const [error, setError] = useState("");

  const handleRemoveMember = async () => {
    try {
      const response = await userAPI.patch(
        `/groups/remove-member/${groupId}/${userId}`
      );
      devLog(response);
    } catch (error) {
      devLog(error);
      setError("An error occurred while removing the member from the group.");
    }
  };

  return (
    <div>
      <ReactIconNavigate icon={CiCircleRemove} onClick={handleRemoveMember} />
      {error && <ErrorDisplay error={error} />}
    </div>
  );
};

export default RemoveMemberFromGroup;
