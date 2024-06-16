import styles from "./UserLoginPage.module.css";
import UserLoginForm from "@auth/UserLoginForm/UserLoginForm";
import HelmetMetaTagsNetlify from "@common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "@common/PiratePxPageRender/PiratePxPageRender";
import useNavigateToMainIfUserIsLoggedIn from "@hooks/useNavigateToMainIfUserIsLoggedIn";

/**
 *
 * Renders the login form and provides a link to the registration page.
 *
 * @returns {JSX.Element} The rendered UserLoginPage component.
 */
const UserLoginPage = () => {
  // Don't render page for loggedIn users, navigate to main instead.
  const checkComplete = useNavigateToMainIfUserIsLoggedIn();

  if (!checkComplete) {
    return;
  }

  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"user-login"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title="gatha - login" />
      <h1>Login</h1>
      <UserLoginForm />
    </main>
  );
};

export default UserLoginPage;
