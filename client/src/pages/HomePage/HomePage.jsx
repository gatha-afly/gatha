import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import Message from "../../components/Message";

const HomePage = () => {
  return (
    <main className={styles.container}>
      {/*     <h1>gatha - get together</h1>
      <p>This is the homepage.</p> */}
      <Message />
      {/*       <Link to="/user-registration">Register</Link> */}
    </main>
  );
};

export default HomePage;
