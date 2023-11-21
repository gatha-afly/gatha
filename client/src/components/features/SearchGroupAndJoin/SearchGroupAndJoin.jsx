import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "../../../api/userAPI";
import useUserContext from "../../../context/useUserContext";
import {
  handleOtherErrors,
  handleServerErrors,
} from "../../../utils/errorUtils";
import ErrorDisplay from "../../common/ErrorDisplay/ErrorDisplay";
import styles from "./SearchGroupAndJoin.module.css";

const SearchGroupAndJoin = () => {
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

      // Update state and localStorage
      const newUserData = response.data.user;
      updateUserData(newUserData);

      // If successful navigate to main
      navigate(`/main`);
    } catch (error) {
      handleOtherErrors(error, setError, "Error joining group", "join-group");
      handleServerErrors(error, setError);
    }
  };

  return (
    <form className={styles.joinGroupForm} onSubmit={handleFormSubmit}>
      <div>
        <input
          type='text'
          name='code'
          placeholder='code'
          ref={inputRef} // Ref for autofocus
          required
        />
      </div>
      {/* Conditionally render error message received from the server */}
      <ErrorDisplay error={error} />
      {/* Submit button for form submission */}
      <button type='submit'>join</button>
    </form>
  );
};

export default SearchGroupAndJoin;
