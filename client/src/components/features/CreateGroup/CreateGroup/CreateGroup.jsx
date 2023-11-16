import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "../../../../api/userAPI";
import useUserContext from "../../../../context/useUserContext";
import {
  handleOtherErrors,
  handleServerErrors,
} from "../../../../utils/errorUtils";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import styles from "./CreateGroup.module.css";

/**
 * Create group form, allowing users to input group information and register.
 */
const CreateGroup = () => {
  // Extract userId from UserContext
  const { userId } = useUserContext().user;
  // Navigation hook for redirecting
  const navigate = useNavigate();
  // Ref for autofocus
  const inputRef = useRef(null);
  // State for errors
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

      // Navigate to add users page on successful registration
      navigate(`/add-user/${groupId}/${userId}/`);
    } catch (error) {
      handleServerErrors(error, setError);
      handleOtherErrors(
        error,
        setError,
        "Error creating group.",
        "create-group"
      );
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
