import { Link } from "react-router-dom";
import PiratePxPageRender from "../../components/reusableComponents/PiratePxPageRender/PiratePxPageRender";
import styles from "./UserLoginPage.module.css";

const UserLoginPage = () => {
  return (
    <main className={styles.container}>
      <PiratePxPageRender COUNT_IDENTIFIER={"user-login"} />
      <h1>User login</h1>
      <p>This is the user login page.</p>
      <p>
        No account yet? <Link to='/user-registration'>Register</Link>
      </p>
    </main>
  );
};

export default UserLoginPage;
