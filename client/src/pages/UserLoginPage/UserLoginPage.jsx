import { Link } from "react-router-dom";
import PiratePxPageRender from "../../components/reusableComponents/PiratePxPageRender/PiratePxPageRender";
import styles from "./UserLoginPage.module.css";
import UserLoginForm from "../../components/containerComponents/UserLoginForm/UserLoginForm";

const UserLoginPage = () => {
  return (
    <main className={styles.container}>
      <PiratePxPageRender COUNT_IDENTIFIER={"user-login"} />
      <h1>User login</h1>
      <UserLoginForm />
      <p>
        No account yet? <Link to="/user-registration">Register</Link>
      </p>
    </main>
  );
};

export default UserLoginPage;
