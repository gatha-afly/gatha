import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className={styles.container}>
      <h1>gatha - get together</h1>
      <p>This is the homepage.</p>
      <Link to='/user-registration'>Register</Link>
    </main>
  );
};

export default HomePage;
