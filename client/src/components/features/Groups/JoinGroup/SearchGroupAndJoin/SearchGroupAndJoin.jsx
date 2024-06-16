import { useEffect, useRef, useState } from "react";
import styles from "./SearchGroupAndJoin.module.css";
import { userAPI } from "@api/userAPI";
import socket from "@api/socket";
import {
  devLog,
  handleOtherErrors,
  handleServerErrors,
} from "@utils/errorUtils";
import ErrorDisplay from "@common/ErrorDisplay/ErrorDisplay";
import useUpdateUserData from "@hooks/useUpdateUser";
import useUserContext from "@hooks/useUserContext";

/**
 * Form that allows searching and joining a group via group code. Shows error message if code does not exist in database
 *
 * @component
 * @returns {JSX.Element} Join group form
 */
const SearchGroupAndJoin = ({ onDefaultViewClick }) => {
  //Custom hook for updating user data
  const { fetchUserUpdates } = useUpdateUserData();

  // Get user data form userContext
  const { user } = useUserContext();
  const userId = user.userId;
  // State for errors
  const [error, setError] = useState(null);
  // Ref for autofocus
  const inputRef = useRef(null);

  // Autofocus first input field on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Extract form data
    const formData = new FormData(e.target);

    // Create data object with username
    const data = {
      code: formData.get("code"),
    };

    try {
      // Attempt to join the group with the provided code
      const response = await userAPI.patch(
        `/groups/join-group/${userId}`,
        data
      );
      devLog("response from /groups/join-group/:", response.data);
      // Disconnect and reconnect socket connection to enable socket connection in new group
      socket.disconnect();
      socket.connect();
      // Update user data
      fetchUserUpdates();
      // Switch to default view
      onDefaultViewClick();
    } catch (error) {
      handleOtherErrors(error, setError, "Error joining group", "join-group");
      handleServerErrors(error, setError);
    }
  };

  return (
    <form className={styles.joinGroupForm} onSubmit={handleFormSubmit}>
      <div>
        <input
          type="text"
          name="code"
          placeholder="code"
          ref={inputRef} // Ref for autofocus
          required
        />
      </div>
      {/* Conditionally render error message received from the server */}
      <ErrorDisplay error={error} />
      {/* Submit button for form submission */}
      <button type="submit">join</button>
    </form>
  );
};

export default SearchGroupAndJoin;
