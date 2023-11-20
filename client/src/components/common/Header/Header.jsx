import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import useUserContext from "../../../context/useUserContext";
import UsernameInitials from "../UsernameInitials/UsernameInitials";
import Logo from "../Logo/Logo";

const Header = () => {
  const { loggedIn, user } = useUserContext();
  return (
    <header className={styles.header}>
      <Logo width={10} />
      {/* Conditionally rendering the user initials info after successful login */}
      {loggedIn ? (
        <UsernameInitials
          firstName={user.firstName}
          lastName={user.lastName}
          radius={5}
          fontSize={2}
        />
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
