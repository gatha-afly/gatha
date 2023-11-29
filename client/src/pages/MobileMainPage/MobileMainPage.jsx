import styles from "./MobileMainPage.module.css";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import useUserContext from "../../context/useUserContext";
import GroupsList from "../../components/features/GroupsList/GroupsList/GroupsList";

/**
 * Mobile version of the main page rendering the GroupsList only that then navigates to the MobileMessengerPage
 */
const MobileMainPage = () => {
  // Retrieve user information
  const { user } = useUserContext();

  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"main-mobile"} />
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
        <div className={styles.groupsList}>
          <GroupsList user={user} />
        </div>
      )}
    </main>
  );
};

export default MobileMainPage;
