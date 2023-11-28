import styles from "./HomePage.module.css";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import NavigateToMainIfUserIsLoggedIn from "../../components/auth/NavigateToMainIfUserIsLoggedIn/NavigateToMainIfUserIsLoggedIn";
import { Link } from "react-router-dom";
import ApplicationImage from "../../components/features/ApplicationImage/ApplicationImage";

const HomePage = () => {
  return (
    <main className={styles.main}>
      {/* Navigate to main if user is already logged in thus registered */}
      <NavigateToMainIfUserIsLoggedIn />
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"homepage"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - get together' />
      <div className={styles.container}>
        <section className={styles.infoContainer}>
          <p>
            <h1>
              {" "}
              Gatha is your brand new chat application to connect to family,
              friends, colleagues and more!
            </h1>
          </p>
          <p>Create your personal account to get started!</p>
          <NavigateButton
            route={"user-registration"}
            buttonText={"Register now!"}
          />
          <p>
            Already registered? <Link to='/user-login'>Login</Link>
          </p>
        </section>
        <ApplicationImage />
      </div>
    </main>
  );
};

export default HomePage;
