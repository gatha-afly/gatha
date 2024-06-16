import { useCallback, useState } from "react";
import { userAPI } from "@api/userAPI";
import { devLog } from "@utils/errorUtils";
import useUserContext from "./useUserContext";

/**
 * Fetches user data and then updates user data in context.
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
      updateUser({ ...user, ...updatedUser });
      devLog("User has been updated:", updatedUser);
    } catch (error) {
      devLog("Error fetching user updates:", error);
      setError(error);
    } finally {
      // End loading, regardless of success or error
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.userId]);

  return { fetchUserUpdates, loading, error };
};

export default useUpdateUserData;
