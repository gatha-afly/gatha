import styles from "./CreateGroupPage.module.css";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import CreateGroup from "../../components/features/CreateGroup/CreateGroup/CreateGroup";

const CreateGroupPage = () => {
  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"create-group"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - create group' />
      <h1>Create group</h1>
      <CreateGroup />
    </main>
  );
};

export default CreateGroupPage;
