import styles from "./AddUserPage.module.css";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";

const AddUserPage = () => {
  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"add-user"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - invite user' />
      <h1>Add user</h1>
    </main>
  );
};

export default AddUserPage;
