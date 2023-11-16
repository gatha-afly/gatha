import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import userAPI from "../../../../api/userAPI";
import {
  handleOtherErrors,
  handleServerErrors,
} from "../../../../utils/errorUtils";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import styles from "./AddUserToGroup.module.css";

/**
 * Create group form, allowing users to input group information and register.
 */
const AddUserToGroup = () => {
  // extract groupId and userId from URL
  const { groupId, userId } = useParams();
  console.log("groupId:", groupId);
  console.log("userId:", userId);
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

    // Create data object with username
    const data = {
      username: formData.get("username"),
    };

    try {
      // Attempt to register the user with the provided data
      await userAPI.patch(`/groups/add-member/${groupId}/${userId}`, data);
      console.log("success");
    } catch (error) {
      handleServerErrors(error, setError);
      handleOtherErrors(error, setError, "Error adding user.", "add-user");
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
