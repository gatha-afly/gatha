import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import useUserContext from "../../../context/useUserContext";
import Logo from "../Logo/Logo";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

const Header = () => {
  const { loggedIn, user } = useUserContext();
  return (
    <header className={styles.header}>
      <Logo width={10} />
      {/* Conditionally render login and logout button */}
      {loggedIn ? (
        <HamburgerMenu firstName={user.firstName} lastName={user.lastName} />
      ) : (
        <Link to='/user-login'>Login</Link>
      )}
    </header>
  );
};

export default Header;
