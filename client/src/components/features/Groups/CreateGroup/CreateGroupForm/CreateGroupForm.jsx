import React, { useState, useEffect, useRef } from "react";
import {
  devLog,
  handleOtherErrors,
  handleServerErrors,
} from "../../../../../utils/errorUtils";
import ErrorDisplay from "../../../../common/ErrorDisplay/ErrorDisplay";
import styles from "./CreateGroupForm.module.css";
import { userAPI } from "../../../../../api/userAPI";
import useUpdateUserData from "../../../../../hooks/useUpdateUser";
import useUserContext from "../../../../../hooks/useUserContext";

/**
 * Create group form, allowing users to input group information and register a group.
 */
const CreateGroupForm = ({ onDefaultViewClick }) => {
  // Get user data form userContext
  const { user } = useUserContext();
  const userId = user.userId;

  // State for errors
  const [error, setError] = useState(null);
  // Ref for autofocus
  const inputRef = useRef(null);

  //Get fetchUserUpdates function from custom hook
  const { fetchUserUpdates } = useUpdateUserData();

  // Autofocus first input field on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Extract form data
    const formData = new FormData(e.target);

    // Create data object with group information
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
    };

    try {
      // Attempt to register the user with the provided data
      const response = await userAPI.post(
        `/groups/create-group/${userId}`,
        data
      );

      devLog();

      // Fetch and update user data
      fetchUserUpdates();
      onDefaultViewClick();
    } catch (error) {
      handleOtherErrors(
        error,
        setError,
        "Error creating group.",
        "create-group"
      );
      handleServerErrors(error, setError);
    }
  };

  return (
    <form className={styles.groupCreationForm} onSubmit={handleFormSubmit}>
      {/* Input fields for group information */}
      <div>
        <input
          type='text'
          name='name'
          placeholder='Group name'
          ref={inputRef} // Ref for autofocus
          required
        />
      </div>

      <div>
        <textarea
          type='text'
          name='description'
          placeholder='Group description'
          rows={5}
        />
      </div>
      {/* Conditionally render error message received from the server */}
      <ErrorDisplay error={error} />
      {/* Submit button for form submission */}
      <button type='submit'>create</button>
    </form>
  );
};

export default CreateGroupForm;
