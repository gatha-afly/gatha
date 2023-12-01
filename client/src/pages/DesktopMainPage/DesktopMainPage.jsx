import styles from "./DesktopMainPage.module.css";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import useUserContext from "../../context/useUserContext";
import GroupsContainer from "../../components/features/Groups/GroupsContainer/GroupsContainer";
import MessengerContainer from "../../components/features/Messenger/MessengerContainer/MessengerContainer";

/**
 * Desktop version of the main page including both the GroupsList and the Messenger
 */
const DesktopMainPage = () => {
  // Retrieve user information
  const { user } = useUserContext();

  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"main"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - main' />
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
        // Render groups list and messenger if the user is a member of a group
        <div className={styles.messengerNotMobile}>
          <GroupsContainer user={user} />
          <MessengerContainer />
        </div>
      )}
    </main>
  );
};

export default DesktopMainPage;
