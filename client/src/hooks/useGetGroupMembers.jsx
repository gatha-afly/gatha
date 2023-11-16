import { useState, useEffect } from "react";
import userAPI from "../api/userAPI";
import { handleOtherErrors, handleServerErrors } from "../utils/errorUtils";

/**
 * Custom hook to fetch group members based on the provided groupId.
 * @param {string} groupId - ID of the group to fetch members for.
 * @returns {Object} - Object containing error state, group name, group members and group admin.
 */
const useGetGroupMembers = (groupId, refreshTrigger) => {
  // State variables to store data and handle errors
  const [error, setError] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupAdmin, setGroupAdmin] = useState({});

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        // Fetch group members from the API
        const response = await userAPI.get(`/groups/get-members/${groupId}`);
        // Destructure the response data
        const { groupName, groupMembers, groupAdmin } = response.data;
        // Set state variables with the fetched data
        setGroupMembers(groupMembers);
        setGroupName(groupName);
        setGroupAdmin(groupAdmin);
      } catch (error) {
        // Handle errors if any occur during the API call
        handleOtherErrors(
          error,
          setError,
          "Error fetching group members.",
          "get-group-members"
        );
        handleServerErrors(error, setError);
      }
    };

    fetchGroupMembers();
  }, [groupId, refreshTrigger]);
  // Return the state variables
  return { error, groupName, groupMembers, groupAdmin };
};

export default useGetGroupMembers;
