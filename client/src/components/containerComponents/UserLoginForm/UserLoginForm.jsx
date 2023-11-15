import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserLoginForm.css";
import useUserContext from "../../../context/useUserContext";

const UserLoginForm = () => {
  const { loginUser, error } = useUserContext();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      await loginUser(data);
      navigate("/main");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Email"
        name="email"
        required
        className="login-input"
      />
      <input
        type={passwordVisible ? "text" : "password"}
        placeholder="Password"
        name="password"
        required
        className="login-input"
      />
      <div className="show-password">
        <input
          className="checkbox"
          type="checkbox"
          id="passwordVisibility"
          checked={passwordVisible}
          onChange={handleTogglePasswordVisibility}
        />

        <label htmlFor="passwordVisibility"> Show Password</label>
      </div>

      {error && <p>{error}</p>}
      <button type="submit" className="login-button">
        Login
      </button>
    </form>
  );
};

export default UserLoginForm;
