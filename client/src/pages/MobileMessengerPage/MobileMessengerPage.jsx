import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import ReactIconNavigate from "../../components/common/ReactIconNavigate/ReactIconNavigate";
import Messenger from "../../components/features/Messenger/Messenger/Messenger";
import styles from "./MobileMessengerPage.module.css";
import { FaArrowLeft } from "react-icons/fa";

const MobileMessengerPage = () => {
  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"main-mobile"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - messenger' />
      <h1>gatha - get together</h1>
      <Messenger />
      <ReactIconNavigate route='/main' size={2.5} icon={FaArrowLeft} />
    </main>
  );
};

export default MobileMessengerPage;
