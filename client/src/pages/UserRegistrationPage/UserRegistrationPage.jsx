import React from "react";
import { Link } from "react-router-dom";
import PiratePxPageRender from "../../components/reusableComponents/PiratePxPageRender/PiratePxPageRender";
import styles from "./UserRegistrationPage.module.css";

const UserRegistrationPage = () => {
  return (
    <main className={styles.container}>
      <PiratePxPageRender COUNT_IDENTIFIER={"user-registration"} />
      <h1>User registration</h1>
      <p>This is the user registration page.</p>
      <p>
        Already signed up? <Link to='/user-login'>Login</Link>
      </p>
    </main>
  );
};

export default UserRegistrationPage;
