import { useEffect, useCallback } from "react";
import userAPI from "../api/userAPI";
import useUserContext from "../context/useUserContext";

const useUpdateUserData = () => {
  const { user, getDataFromHookAndUpdateUser } = useUserContext();

  const fetchUserUpdates = useCallback(async () => {
    try {
      const response = await userAPI.get(`users/update/${user.userId}`);
      const userData = response.data.user;

      getDataFromHookAndUpdateUser(userData);
    } catch (error) {
      console.error("Error fetching user updates:", error);
      throw error; // Rethrow the error if needed for the calling component
    }
  }, [user.userId, getDataFromHookAndUpdateUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserUpdates();
      } catch (error) {
        // Handle errors if needed
      }
    };

    fetchData();

    return () => {
      // Cleanup function to cancel the API call on component unmount
      // This is important to avoid memory leaks
    };
  }, [fetchUserUpdates]);

  return { fetchUserUpdates };
};

export default useUpdateUserData;
