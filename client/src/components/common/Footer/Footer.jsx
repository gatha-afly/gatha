import styles from "./Footer.module.css";
import useUserContext from "../../../context/useUserContext";

const Footer = () => {
  const { loggedIn } = useUserContext();

  return (
    <footer
      className={`${styles.footer} ${
        loggedIn ? styles.loggedInFooter : styles.notLoggedInFooter
      }`}>
      <p>
        <span className={styles.copyrightSign}>&copy; </span>
        <span className={styles.year}>{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
};

export default Footer;
