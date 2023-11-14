import styles from "./HomePage.module.css";
import PiratePxPageRender from "../../components/reusableComponents/PiratePxPageRender/PiratePxPageRender";
import NavigateButton from "../../components/reusableComponents/NavigateButton/NavigateButton";
import HelmetMetaTagsNetlify from "../../components/reusableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";

const HomePage = () => {
  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"homepage"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title="gatha - get together" />
      <h1>gatha - get together</h1>
      <p>This is the homepage.</p>
      <NavigateButton route={"user-registration"} buttonText={"Register"} />
    </main>
  );
};

export default HomePage;
