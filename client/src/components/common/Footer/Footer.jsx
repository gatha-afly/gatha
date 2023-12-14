import useUserContext from "../../../hooks/useUserContext";
import styles from "./Footer.module.css";

/**
 * Footer Component - Displays the footer with copyright information.
 *
 * @component
 * @returns {JSX.Element} - Returns the JSX element representing the Footer.
 */
const Footer = () => {
  const { loggedIn } = useUserContext();
  // Footer container with dynamic class based on the loggedIn state
  return (
    <footer
      className={`${styles.footer} ${
        loggedIn ? styles.loggedInFooter : styles.notLoggedInFooter
      }`}>
      {/* Copyright information */}
      <p>
        <span className={styles.copyrightSign}>&copy; </span>
        {/* Display the current year dynamically */}
        <span className={styles.year}>{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
};

export default Footer;
