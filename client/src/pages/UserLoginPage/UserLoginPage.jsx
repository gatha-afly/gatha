import { Link } from "react-router-dom";
import HelmetMetaTagsNetlify from "../../components/reusableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/reusableComponents/PiratePxPageRender/PiratePxPageRender";
import styles from "./UserLoginPage.module.css";

const UserLoginPage = () => {
  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"user-login"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - login' />
      <h1>User login</h1>
      <p>This is the user login page.</p>
      <p>
        No account yet? <Link to='/user-registration'>Register</Link>
      </p>
    </main>
  );
};

export default UserLoginPage;
