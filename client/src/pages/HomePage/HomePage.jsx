import styles from "./HomePage.module.css";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import NavigateToMainIfUserIsLoggedIn from "../../components/auth/NavigateToMainIfUserIsLoggedIn/NavigateToMainIfUserIsLoggedIn";

const HomePage = () => {
  return (
    <main className={styles.container}>
      {/* Navigate to main if user is already logged in thus registered */}
      <NavigateToMainIfUserIsLoggedIn />
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"homepage"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - get together' />
      <h1>gatha - get together</h1>
      <p>This is the homepage.</p>
      <NavigateButton route={"user-registration"} buttonText={"Register"} />
    </main>
  );
};

export default HomePage;
