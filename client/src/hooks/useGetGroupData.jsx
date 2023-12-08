import { useState, useEffect } from "react";
import { userAPI } from "../api/userAPI";
import {
  devLog,
  handleOtherErrors,
  handleServerErrors,
} from "../utils/errorUtils";

/**
 * Custom hook to fetch group data based on the provided groupId and userId.
 * @param {string} userId - ID of the user fetching the group data
 * @param {string} groupId - ID of the group to fetch data
 * @returns {Object} - Object containing error state and group data.
 */
const useGetGroupData = (groupId, userId) => {
  // State variables to store data and handle errors
  const [error, setError] = useState(null);
  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        // Fetch group data from the API
        const response = await userAPI.get(
          `/groups/get-group-data/${groupId}/${userId}`
        );

        // Extract relevant information from the response
        const { data, status } = response;
        devLog("group data:", response);
        setGroupData({ data, status });
      } catch (error) {
        // Handle errors if any occur during the API call
        handleServerErrors(error, setError);
        handleOtherErrors(
          error,
          setError,
          "Error fetching group data.",
          "get-group-data"
        );
      }
    };

    fetchGroupData();
  }, [groupId, userId]);

  // Return the state variables
  return { error, groupData };
};

export default useGetGroupData;
