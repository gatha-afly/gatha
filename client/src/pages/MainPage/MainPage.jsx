import styles from "./MainPage.module.css";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import useUserContext from "../../context/useUserContext";
import GroupsList from "../../components/features/GroupsList/GroupsList";
import Messenger from "../../components/features/Messenger/Messenger";

const MainPage = () => {
  // Retrieve user information
  const { user } = useUserContext();

  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"main"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title="gatha - main" />
      <h1>gatha - get together</h1>
      {/*Render join or create group call to action if user is not member of a group */}
      {user.groups.length === 0 ? (
        <div className={styles.getStartedCta}>
          <p>To get started, either create or join a group</p>
          <NavigateButton
            route={"create-group"}
            buttonText={"create a group"}
          />
          <NavigateButton route={"join-group"} buttonText={"join a group"} />
        </div>
      ) : (
        <div className={styles.messengerNotMobile}>
          <GroupsList user={user} />
          <Messenger />
        </div>
      )}
    </main>
  );
};

export default MainPage;
