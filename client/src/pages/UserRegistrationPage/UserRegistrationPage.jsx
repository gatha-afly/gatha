import styles from "./UserRegistrationPage.module.css";
import UserRegistration from "@auth/UserRegistration/UserRegistration";
import HelmetMetaTagsNetlify from "@common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "@common/PiratePxPageRender/PiratePxPageRender";
import useNavigateToMainIfUserIsLoggedIn from "@hooks/useNavigateToMainIfUserIsLoggedIn";

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
      <HelmetMetaTagsNetlify title="gatha - user registration" />
      <h1>Registration</h1>
      <UserRegistration />
    </main>
  );
};

export default UserRegistrationPage;
