import useUserContext from "../../../hooks/useUserContext";
import styles from "./Footer.module.css";

/**
 * Footer Component - Displays the footer with copyright information linking to GitHub repo.
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
      {/* Copyright information linking to GitHub repo */}
      <a
        className={styles.github}
        href='https://github.com/gatha-afly/gatha'
        target='_blank'
        rel='noopener noreferrer'>
        <span className={styles.copyrightSign}>&copy; </span>
        {/* Display the current year dynamically */}
        <span className={styles.year}>{new Date().getFullYear()}</span>
      </a>
    </footer>
  );
};

export default Footer;
