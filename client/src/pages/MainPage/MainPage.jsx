import styles from "./MainPage.module.css";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";

const MainPage = () => {
  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"main"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - main' />
      <h1>gatha - get together</h1>
      <p>To get started, either create or join a group</p>
      <NavigateButton route={"create-group"} buttonText={"create a group"} />
      <NavigateButton route={"join-group"} buttonText={"join a group"} />
    </main>
  );
};

export default MainPage;
