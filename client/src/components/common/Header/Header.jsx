import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import HamburgerMenu from "../HamburgerMenu/Menu/HamburgerMenu";
import useUserContext from "../../../hooks/useUserContext";

/**
 * Header Component - Displays the header with a logo, login/logout button, and hamburger menu.
 *
 * @component
 * @returns {JSX.Element} - Returns the JSX element representing the Header.
 */
const Header = () => {
  const { loggedIn, user } = useUserContext();

  return (
    /* 
      Set header class dynamically based on the loggedIn status:
    */
    <header
      className={`${styles.header} ${
        loggedIn ? styles.loggedInHeader : styles.notLoggedInHeader
      }`}>
      {/* 
        Render the Logo img without background if not logged in,
        and with background if logged in.
      */}
      <Logo withBackground={loggedIn} className={styles.logo} />
      {/* Conditionally render login and logout button */}
      {loggedIn ? (
        <HamburgerMenu firstName={user.firstName} lastName={user.lastName} />
      ) : (
        <Link to='/user-login' className={styles.Login}>
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;
