import { useNavigate } from "react-router-dom";
import usePasswordVisibility from "../../../hooks/usePasswordVisibility";
import styles from "./UserLogin.module.css";
import ErrorDisplay from "../../common/ErrorDisplay/ErrorDisplay";
import { devLog } from "../../../utils/errorUtils";
import useUserContext from "../../../hooks/useUserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
        type="text"
        placeholder="Email"
        name="email"
        required
        className={styles.loginInput}
      />
      {/* Password input with eye icon */}
      <div className={styles.passwordContainer}>
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          name="password"
          required
          className={styles.loginInputWithIcon}
        />
        <span
          className={styles.togglePasswordIcon}
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {/* Display error message if present */}
      <ErrorDisplay error={error} />
      {/* Login button */}

      <button type="submit" className={styles.loginButton}>
        Login
      </button>
    </form>
  );
};

export default UserLogin;
