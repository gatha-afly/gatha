import React, { useState, useEffect, useRef } from "react";
import {
  handleOtherErrors,
  handleServerErrors,
} from "../../../utils/errorUtils";
import userAPI from "../../../api/userAPI";
import styles from "./AddUserToGroup.module.css";
import ErrorDisplay from "../../common/ErrorDisplay/ErrorDisplay";

/**
 * Component for admin users to add other users to a group
 */
const AddUserToGroup = ({ groupId, userId, onRefresh }) => {
  // Ref for autofocus
  const inputRef = useRef(null);
  // State for username & errors
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

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
      username: formData.get("username"),
    };

    try {
      // Attempt to register the user with the provided data
      await userAPI.patch(`/groups/add-member/${groupId}/${userId}`, data);
      // Clear and autofocus username field on successful patch
      setUsername("");
      inputRef.current.focus();
      // Call refresh function
      onRefresh();
    } catch (error) {
      handleOtherErrors(error, setError, "Error adding user.", "add-user");
      handleServerErrors(error, setError);
    }
  };

  return (
    <form className={styles.addUserForm} onSubmit={handleFormSubmit}>
      <div>
        <input
          type='text'
          name='username'
          placeholder='username'
          ref={inputRef} // Ref for autofocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      {/* Conditionally render error message received from the server */}
      <ErrorDisplay error={error} />
      {/* Submit button for form submission */}
      <button type='submit'>add</button>
    </form>
  );
};

export default AddUserToGroup;
