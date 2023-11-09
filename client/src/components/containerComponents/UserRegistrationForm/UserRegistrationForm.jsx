import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./UserRegistrationForm.module.css";

/**
 * UserRegistrationForm Component
 *
 * Registration form, allowing users to input their information
 * and register.
 */
const UserRegistrationForm = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // State variables for form fields and error handling
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState(null);

  // Autofocus first input field on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if entered passwords match
    if (password !== passwordCheck) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send user registration request to the server
      await axios.post(`${apiUrl}/users/register`, {
        firstName,
        lastName,
        username,
        email,
        password,
      });

      // Navigate to the login page on successful registration
      navigate("/user-login");
    } catch (error) {
      // Handle errors from the server
      if (error.response && error.response.data && error.response.data.errors) {
        // Validation errors from server
        const serverErrors = error.response.data.errors;

        // Render the first error message
        setError(serverErrors[0].msg);
      } else {
        // Handle other types of errors
        console.error("Error creating user:", error);
        setError("Error creating user. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={styles.input}>
        <label className={styles.label}>
          First Name:
          <input
            type='text'
            name='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            ref={inputRef} // Ref for autofocus
            required
          />
        </label>
      </div>

      <div className={styles.input}>
        <label className={styles.label}>
          Last Name:
          <input
            type='text'
            name='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
      </div>

      <div className={styles.input}>
        <label className={styles.label}>
          Username:
          <input
            type='text'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
      </div>

      <div className={styles.input}>
        <label className={styles.label}>
          Email:
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>

      <div className={styles.input}>
        <label className={styles.label}>
          Password:
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>

      <div className={styles.input}>
        <label className={styles.label}>
          Confirm Password:
          <input
            type='password'
            name='passwordCheck'
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            required
          />
        </label>
      </div>
      {/* Conditionally render error message */}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {/* Submit button */}
      <button type='submit'>Register</button>
    </form>
  );
};

export default UserRegistrationForm;
