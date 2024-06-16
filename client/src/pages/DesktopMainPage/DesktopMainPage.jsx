import { useEffect } from "react";
import styles from "./DesktopMainPage.module.css";
import HelmetMetaTagsNetlify from "@common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "@common/PiratePxPageRender/PiratePxPageRender";
import GroupsContainer from "@features/Groups/GroupsContainer/GroupsContainer";
import MessengerContainer from "@features/Messenger/MessengerContainer/MessengerContainer";
import useUpdateUserData from "../../hooks/useUpdateUser";
import useUserContext from "@hooks/useUserContext";

/**
 * Desktop version of the main page including both the GroupsList and the Messenger
 */
const DesktopMainPage = () => {
  // Get user from context
  const { user } = useUserContext();
  // Get user updates
  const { fetchUserUpdates } = useUpdateUserData();

  // Update user data on mount
  useEffect(() => {
    fetchUserUpdates();
  }, [fetchUserUpdates]);

  // FetchUserUpdates every 60 seconds to keep UI in sync with server
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchUserUpdates();
    }, 60000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [fetchUserUpdates]);

  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"main"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title="gatha - main" />
      <div className={styles.messengerNotMobile}>
        <GroupsContainer user={user} />
        <MessengerContainer />
      </div>
    </main>
  );
};

export default DesktopMainPage;
