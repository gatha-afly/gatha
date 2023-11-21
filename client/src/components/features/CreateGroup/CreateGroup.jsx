import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  handleOtherErrors,
  handleServerErrors,
} from "../../../utils/errorUtils";
import ErrorDisplay from "../../common/ErrorDisplay/ErrorDisplay";
import useUserContext from "../../../context/useUserContext";
import styles from "./CreateGroup.module.css";
import userAPI from "../../../api/userAPI";

/**
 * Create group form, allowing users to input group information and register.
 */
const CreateGroup = () => {
  // Get user data form userContext
  const { user, updateUserData } = useUserContext();
  const userId = user.userId;
  // State for errors
  const [error, setError] = useState(null);
  // Navigation hook for redirecting
  const navigate = useNavigate();
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
      // Access groupId returned from the server
      const groupId = response.data.newGroup._id;
      console.log(response);

      // Update state and localStorage
      const newUserData = response.data.updatedUser;
      updateUserData(newUserData);

      // Navigate to add users page on successful registration
      navigate(`/add-user/${groupId}/${userId}/`);
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

export default CreateGroup;
