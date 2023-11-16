import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import useUserContext from "../../../context/useUserContext";

const Header = () => {
  const { loggedIn, user } = useUserContext();
  return (
    <header className={styles.header}>
      <Link to='/'>Home</Link>
      <p>This is the header.</p>

      {/* Conditionally rendering the user info after successful login */}
      {loggedIn ? <p>Welcome, {`${user.firstName} ${user.lastName}`}</p> : null}

      {/* Conditionally render login and logout button */}
      {loggedIn ? (
        <Link to='/user-logout'>Logout</Link>
      ) : (
        <Link to='/user-login'>Login</Link>
      )}
    </header>
  );
};

export default Header;
