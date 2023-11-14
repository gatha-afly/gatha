import { useNavigate } from "react-router-dom";
import "./UserLoginForm.css";
import useUserContext from "../../../context/useUserContext";

const UserLoginForm = () => {
  const { loginUser, error } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      await loginUser(data);
      navigate("/");
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
        type="password"
        placeholder="Password"
        name="password"
        required
        className="login-input"
      />
      <button className="login-button">Login</button>
    </form>
  );
};

export default UserLoginForm;
