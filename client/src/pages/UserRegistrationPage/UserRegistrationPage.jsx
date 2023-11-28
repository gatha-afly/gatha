import { Link } from "react-router-dom";
import NavigateToMainIfUserIsLoggedIn from "../../components/auth/NavigateToMainIfUserIsLoggedIn/NavigateToMainIfUserIsLoggedIn";
import UserRegistration from "../../components/auth/UserRegistration/UserRegistration";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import styles from "./UserRegistrationPage.module.css";

const UserRegistrationPage = () => {
  return (
    <main className={styles.container}>
      {/* Navigate to main if user is already logged in thus registered */}
      <NavigateToMainIfUserIsLoggedIn />
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"user-registration"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - user registration' />
      <h1>Registration</h1>
      <UserRegistration />
      <p>
        Already signed up? <Link to='/user-login'>Login</Link>
      </p>
    </main>
  );
};

export default UserRegistrationPage;
