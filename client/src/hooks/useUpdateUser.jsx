import { useCallback, useState } from "react";
import userAPI from "../api/userAPI";
import useUserContext from "../context/useUserContext";
import { devLog } from "../utils/errorUtils";

/**
 * Fetches user data and then updates user data in context and localStorage.
 *
 * @returns {Object} An object containing the `fetchUserUpdates` function,
 * loading state, and error state.
 */
const useUpdateUserData = () => {
  // Access user data and function
  const { user, updateUser } = useUserContext();

  // State to manage loading, error and user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data using useCallback to enable calling custom hook not only on top level
  const fetchUserUpdates = useCallback(async () => {
    try {
      // Start loading
      setLoading(true);
      const response = await userAPI.get(`users/update/${user.userId}`);
      const updatedUser = response.data.user;
      // Update user data
      updateUser(updatedUser);
      devLog("User has been updated");
    } catch (error) {
      console.error("Error fetching user updates:", error);
      setError(error);
    } finally {
      // End loading, regardless of success or error
      setLoading(false);
    }
  }, [user.userId]);

  return { fetchUserUpdates, loading, error };
};

export default useUpdateUserData;
