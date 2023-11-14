import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import useUserContext from "../../context/useUserContext";

const Header = () => {
  const { loggedIn, user } = useUserContext();
  return (
    <header className={styles.header}>
      <Link to="/">Home</Link>
      <p>This is the header.</p>
      {loggedIn ? <p>Welcome, {`${user.firstName} ${user.lastName}`}</p> : null}
      <Link to="/user-login">Login</Link>
      <Link to="/user-logout">Logout</Link>
    </header>
  );
};

export default Header;
