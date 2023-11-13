import styles from "./CreateGroupPage.module.css";
import PiratePxPageRender from "../../components/reusableComponents/PiratePxPageRender/PiratePxPageRender";
import HelmetMetaTagsNetlify from "../../components/reusableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";

const CreateGroupPage = () => {
  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"create-group"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - create group' />
      <h1>Create group</h1>
    </main>
  );
};

export default CreateGroupPage;
