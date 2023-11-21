import styles from "./CreateGroupPage.module.css";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import CreateGroup from "../../components/features/CreateGroup/CreateGroup";
import NavigateBackForth from "../../components/common/NavigateBackForth/NavigateBackForth";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

const CreateGroupPage = () => {
  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"create-group"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - create group' />
      <h1>Create group</h1>
      <CreateGroup />
      <NavigateBackForth
        route={"main"}
        buttonText={faLeftLong}
        alignment={"left"}
      />
    </main>
  );
};

export default CreateGroupPage;
