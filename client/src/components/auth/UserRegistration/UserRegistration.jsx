import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAPI } from "../../../api/userAPI";
import {
  handleOtherErrors,
  handleServerErrors,
} from "../../../utils/errorUtils";
import usePasswordVisibility from "../../../hooks/usePasswordVisibility";
import ErrorDisplay from "../../common/ErrorDisplay/ErrorDisplay";
import styles from "./UserRegistration.module.css";
import Spinner from "../../common/Spinner/Spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/**
 * UserRegistrationForm Component
 *
 * Registration form, allowing users to input their information
 * and register.
 */
const UserRegistration = () => {
  // Navigation hook for redirecting
  const navigate = useNavigate();
  // Ref for autofocus
  const inputRef = useRef(null);
  // States for password mismatch, registrationSucces message, loading and error
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Use custom hook for managing password visibility
  const { passwordVisible, togglePasswordVisibility } = usePasswordVisibility();

  // Autofocus first input field on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Set loading to true
    setLoading(true);
    // Clear error message, password mismatch, registration success
    setError("");
    setPasswordMismatch(false);
    setRegistrationSuccess(false);
    // Extract form data
    const formData = new FormData(e.target);

    // Create data object with user information
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
    };

    // Check if both entered passwords match
    const confirmedPassword = formData.get("confirm-password");
    if (data.password !== confirmedPassword) {
      setPasswordMismatch(true);
      return;
    } else {
      setPasswordMismatch(false);
    }

    try {
      // Attempt to register the user with the provided data
      await userAPI.post("/users/register", data);
      setLoading(false);
      setRegistrationSuccess(true);
      // Wait for 5 seconds before navigating to login
      setTimeout(() => {
        navigate("/user-login");
      }, 4000);
    } catch (error) {
      // Set loading to false
      setLoading(false);
      handleOtherErrors(error, setError, "Error creating user.", "create-user");
      handleServerErrors(error, setError);
    }
  };

  return (
    <>
      <form className={styles.registrationForm} onSubmit={handleFormSubmit}>
        {/* Input fields for user information */}
        <div>
          <input
            type='text'
            name='firstName'
            placeholder='First name'
            ref={inputRef} // Ref for autofocus
            required
          />
        </div>

        <div>
          <input type='text' name='lastName' placeholder='Last name' required />
        </div>

        <div>
          <input
            type='text'
            name='username'
            placeholder='Username'
            autoComplete='nope'
            required
          />
        </div>

        <div>
          <input
            type='email'
            name='email'
            placeholder='Email'
            autoComplete='email'
            required
          />
        </div>
        {/* Password input with eye icon */}
        <div className={styles.passwordContainer}>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder='Password'
            name='password'
            required
          />
          <span
            className={styles.togglePasswordIcon}
            onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Password input with eye icon */}
        <div className={styles.passwordContainer}>
          <input
            type={passwordVisible ? "text" : "password"}
            name='confirm-password'
            placeholder='Confirm password'
            required
          />
          <span
            className={styles.togglePasswordIcon}
            onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {/* Display an error message if the passwords do not match */}
        {passwordMismatch && (
          <p className={styles.errorMessage}>Entered passwords do not match.</p>
        )}

        {/* Conditionally render Spinner*/}
        {loading && <Spinner />}
        {/* Conditionally render error message received from the server */}
        {error && <ErrorDisplay error={error} />}
        {/* Don't render form submission button while loading and upon successful registration*/}
        {loading ||
          (!registrationSuccess && !loading && (
            <button type='submit'>Register</button>
          ))}
        {/* Conditionally render improved success message */}
        {registrationSuccess && (
          <p className={styles.successMessage}>
            Registration successful. Redirecting to login page...
          </p>
        )}
      </form>
      {!registrationSuccess && (
        <p>
          Already signed up? <Link to='/user-login'>Login</Link>
        </p>
      )}
    </>
  );
};

export default UserRegistration;
