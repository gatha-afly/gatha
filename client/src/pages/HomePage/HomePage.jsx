import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import HelmetMetaTagsNetlify from "@common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "@common/PiratePxPageRender/PiratePxPageRender";
import NavigateButton from "@common/NavigateButton/NavigateButton";
import ApplicationImage from "@features/ApplicationImage/ApplicationImage";
import useNavigateToMainIfUserIsLoggedIn from "@hooks/useNavigateToMainIfUserIsLoggedIn";

/**
 * Home page of the Gatha application.
 * Renders information about the chat application and encourages user registration *
 * @returns {JSX.Element} The rendered home page component.
 */
const HomePage = () => {
  // Don't render page for loggedIn users, navigate to main instead.
  const checkComplete = useNavigateToMainIfUserIsLoggedIn();

  if (!checkComplete) {
    return;
  }

  return (
    <main className={styles.main}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"homepage"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title="gatha - get together" />
      <div className={styles.container}>
        <section className={styles.infoContainer}>
          <>
            <h1>
              Gatha is your brand-new chat application to connect with family,
              friends, colleagues, and more.
            </h1>
          </>
          <h2>Create your personal account to get started!</h2>
          <NavigateButton
            route={"user-registration"}
            buttonText={"Register now!"}
          />
          <p className={styles.loginCTA}>
            Already registered? <Link to="/user-login">Login</Link>
          </p>
        </section>
        <ApplicationImage />
      </div>
    </main>
  );
};

export default HomePage;
