import styles from "./AddUserUponGroupCreationPage.module.css";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import AddUserToGroup from "../../components/features/CreateGroup/AddUserToGroup/AddUserToGroup";

const AddUserUponGroupCreationPage = () => {
  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"add-user"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - invite user' />
      <h1>Add user</h1>
      <AddUserToGroup />
    </main>
  );
};

export default AddUserUponGroupCreationPage;
