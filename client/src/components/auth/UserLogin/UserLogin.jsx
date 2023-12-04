import { useNavigate } from "react-router-dom";
import usePasswordVisibility from "../../../hooks/usePasswordVisibility";
import styles from "./UserLogin.module.css";
import useUserContext from "../../../context/useUserContext";
import ErrorDisplay from "../../common/ErrorDisplay/ErrorDisplay";
import { devLog } from "../../../utils/errorUtils";

const UserLogin = () => {
  // Access user context and navigation functions
  const { loginUser, error } = useUserContext();
  const navigate = useNavigate();

  // Use custom hook for managing password visibility
  const { passwordVisible, togglePasswordVisibility } = usePasswordVisibility();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Extract form data
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      // Attempt user login
      await loginUser(data);
      // Navigate to the main page on successful login
      navigate("/main");
    } catch (error) {
      // Handle login errors and update error state for user feedback
      devLog(error);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleLogin}>
      {/* Email input */}
      <input
        type='text'
        placeholder='Email'
        name='email'
        required
        className={styles.loginInput}
      />
      {/* Password input */}
      <input
        type={passwordVisible ? "text" : "password"}
        placeholder='Password'
        name='password'
        required
        className={styles.loginInput}
      />
      {/* Show password checkbox */}
      <div className={styles.showPassword}>
        <input
          className={styles.checkbox}
          type='checkbox'
          id='passwordVisibility'
          checked={passwordVisible}
          onChange={togglePasswordVisibility}
        />
        <label
          className={styles.showPasswordLabel}
          htmlFor='passwordVisibility'>
          Show password
        </label>
      </div>
      {/* Display error message if present */}
      <ErrorDisplay error={error} />
      {/* Login button */}

      <button type='submit' className={styles.loginButton}>
        Login
      </button>
    </form>
  );
};

export default UserLogin;
