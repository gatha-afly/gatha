import styles from "./JoinGroupPage.module.css";
import PiratePxPageRender from "../../components/reusableComponents/PiratePxPageRender/PiratePxPageRender";
import HelmetMetaTagsNetlify from "../../components/reusableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";

const JoinGroupPage = () => {
  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"join-group"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - join group' />
      <h1>Join a group</h1>
    </main>
  );
};

export default JoinGroupPage;
