import UserRegistration from "../../components/auth/UserRegistration/UserRegistration";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import useNavigateToMainIfUserIsLoggedIn from "../../hooks/useNavigateToMainIfUserIsLoggedIn";
import styles from "./UserRegistrationPage.module.css";

/**
 * Renders the user registration page. Checks if the user is already logged in,
 * and if so, redirects to the main page. Otherwise, displays the user registration form.
 *
 */
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
    </main>
  );
};

export default UserRegistrationPage;
