import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to='/'>main</Link>
      <p>This is the header.</p>

      <Link to='/user-login'>Login</Link>
    </header>
  );
};

export default Header;
