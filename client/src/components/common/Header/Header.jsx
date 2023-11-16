import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import useUserContext from "../../../context/useUserContext";
import UsernameInitials from "../UsernameInitials/UsernameInitials";

const Header = () => {
  const { loggedIn, user } = useUserContext();
  return (
    <header className={styles.header}>
      <Link to='/'>Home</Link>

      {/* Conditionally rendering the user initials info after successful login */}
      {loggedIn ? (
        <UsernameInitials firstName={user.firstName} lastName={user.lastName} />
      ) : null}

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
