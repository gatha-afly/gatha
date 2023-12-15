import { Link, useNavigate } from "react-router-dom";
import usePasswordVisibility from "../../../hooks/usePasswordVisibility";
import styles from "./UserLoginForm.module.css";
import ErrorDisplay from "../../common/ErrorDisplay/ErrorDisplay";
import { devLog } from "../../../utils/errorUtils";
import useUserContext from "../../../hooks/useUserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Spinner from "../../common/Spinner/Spinner";

const UserLoginForm = () => {
  // Access user context and navigation functions
  const { loginUser, error } = useUserContext();
  const navigate = useNavigate();

  // States for loading
  const [loading, setLoading] = useState(false);

  // Use custom hook for managing password visibility
  const { passwordVisible, togglePasswordVisibility } = usePasswordVisibility();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    // Set loading to true
    setLoading(true);
    // Extract form data
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      // Attempt user login
      await loginUser(data);
      setLoading(false);
      // Navigate to the main page on successful login
      navigate("/main");
    } catch (error) {
      setLoading(false);
      // Handle login errors
      devLog(error);
    }
  };

  return (
    <>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        {/* Email input */}
        <input
          type='text'
          placeholder='Email'
          name='email'
          required
          className={styles.loginInput}
        />
        {/* Password input with eye icon */}
        <div className={styles.passwordContainer}>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder='Password'
            name='password'
            required
            className={styles.loginInput}
          />
          {/* Toggle password visibility icon */}
          <span
            className={styles.togglePasswordIcon}
            onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {/* Conditionally render Spinner*/}
        {loading && <Spinner />}
        {/* Conditionally render error message received from the server */}
        {error && <ErrorDisplay error={error} />}
        {/* Conditionally render Login button */}
        {!loading && (
          <button type='submit' className={styles.loginButton}>
            Login
          </button>
        )}
      </form>
      {!loading && (
        <p>
          No account yet? <Link to='/user-registration'>Register</Link>
        </p>
      )}
    </>
  );
};

export default UserLoginForm;
