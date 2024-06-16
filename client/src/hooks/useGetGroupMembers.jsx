import { useState, useEffect } from "react";
import { userAPI } from "@api/userAPI";
import { handleOtherErrors, handleServerErrors } from "@utils/errorUtils";
import { devLog } from "@utils/errorUtils";
import useUserContext from "./useUserContext";

/**
 * Custom hook to fetch group members based on the provided groupId.
 * @param {string} groupId - ID of the group to fetch members for.
 * @returns {Object} - Object containing error state, group name, group members and group admin.
 */
const useGetGroupMembers = (groupId, refreshTrigger) => {
  const { userId } = useUserContext().user;
  // State variables to store data and handle errors
  const [error, setError] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        // Fetch group members from the API
        const response = await userAPI.get(
          `/groups/get-members/${groupId}/${userId}`
        );
        // Destructure the response data
        const { name, members } = response.data;
        devLog("response from /groups/get-members/:", response.data);
        // Set state variables with the fetched data
        setGroupMembers(members);
        setGroupName(name);
        // Set state variables with the fetched data
        devLog(response.data);
      } catch (error) {
        // Handle errors if any occur during the API call
        handleServerErrors(error, setError);
        handleOtherErrors(
          error,
          setError,
          "Error fetching group members.",
          "get-group-members"
        );
      }
    };

    fetchGroupMembers();
  }, [groupId, refreshTrigger]);
  // Return the state variables
  return { error, groupName, groupMembers };
};

export default useGetGroupMembers;
