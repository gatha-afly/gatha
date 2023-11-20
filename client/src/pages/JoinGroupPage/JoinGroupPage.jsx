import styles from "./JoinGroupPage.module.css";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import SearchGroupAndJoin from "../../components/features/SearchGroupAndJoin/SearchGroupAndJoin";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import NavigateBackForth from "../../components/common/NavigateBackForth/NavigateBackForth";

const JoinGroupPage = () => {
  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"join-group"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - join group' />
      <h1>Join a group</h1>
      <SearchGroupAndJoin />
      <NavigateBackForth
        route={"main"}
        buttonText={faLeftLong}
        alignment={"left"}
      />
    </main>
  );
};

export default JoinGroupPage;
