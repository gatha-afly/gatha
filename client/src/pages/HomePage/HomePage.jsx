import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import PiratePxPageRender from "../../components/reusableComponents/PiratePxPageRender/PiratePxPageRender";

const HomePage = () => {
  return (
    <main className={styles.container}>
      <PiratePxPageRender COUNT_IDENTIFIER={"homepage"} />
      <h1>gatha - get together</h1>
      <p>This is the homepage.</p>
      <Link to='/user-registration'>Register</Link>
    </main>
  );
};

export default HomePage;
