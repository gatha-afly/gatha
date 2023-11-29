import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import ReactIconNavigate from "../../components/common/ReactIconNavigate/ReactIconNavigate";
import Messenger from "../../components/features/Messenger/Messenger/Messenger";
import styles from "./MobileMessengerPage.module.css";
import { FaArrowLeft } from "react-icons/fa";

/**
 *
 * Renders the messenger interface for mobile devices.
 * @returns {JSX.Element} - The JSX element representing the mobile messenger page.
 */
const MobileMessengerPage = () => {
  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"main-mobile"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - messenger' />
      <h1>gatha - get together</h1>
      {/* Messenger component */}
      <Messenger />
      {/* Navigation icon to go back to the main page */}
      <ReactIconNavigate route='/main' size={2.5} icon={FaArrowLeft} />
    </main>
  );
};

export default MobileMessengerPage;
