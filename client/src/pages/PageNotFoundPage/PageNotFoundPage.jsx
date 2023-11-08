import { Link } from "react-router-dom";
import styles from "./PageNotFoundPage.module.css";

const PageNotFoundPage = () => {
  return (
    <main className={styles.container}>
      <h1>🚧 404 - Page not found</h1>
      <p>The page you're looking for does not exist.</p>
      <Link to='/'>Go to main</Link>
    </main>
  );
};

export default PageNotFoundPage;
