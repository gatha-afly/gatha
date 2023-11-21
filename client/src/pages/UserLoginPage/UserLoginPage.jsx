import { Link } from "react-router-dom";
import NavigateToMainIfUserIsLoggedIn from "../../components/auth/NavigateToMainIfUserIsLoggedIn/NavigateToMainIfUserIsLoggedIn";
import UserLogin from "../../components/auth/UserLogin/UserLogin";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import styles from "./UserLoginPage.module.css";

const UserLoginPage = () => {
  return (
    <main className={styles.container}>
      {/* Navigate to main if user is already logged in thus registered */}
      <NavigateToMainIfUserIsLoggedIn />
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"user-login"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - login' />
      <h1>User login</h1>
      <UserLogin />
      <p>
        No account yet? <Link to='/user-registration'>Register</Link>
      </p>
    </main>
  );
};

export default UserLoginPage;
