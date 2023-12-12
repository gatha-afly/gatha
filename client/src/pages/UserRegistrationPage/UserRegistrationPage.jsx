import { Link } from "react-router-dom";
import UserRegistration from "../../components/auth/UserRegistration/UserRegistration";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import useNavigateToMainIfUserIsLoggedIn from "../../hooks/useNavigateToMainIfUserIsLoggedIn";
import styles from "./UserRegistrationPage.module.css";

const UserRegistrationPage = () => {
  // Don't render page for loggedIn users, navigate to main instead.
  const checkComplete = useNavigateToMainIfUserIsLoggedIn();

  if (!checkComplete) {
    return null;
  }

  return (
    <main className={styles.container}>
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
