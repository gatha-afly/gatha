import styles from "./MobileMainPage.module.css";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import GroupsContainer from "../../components/features/Groups/GroupsContainer/GroupsContainer";
import useUpdateUserData from "../../hooks/useUpdateUser";
import { useEffect } from "react";
import ErrorDisplay from "../../components/common/ErrorDisplay/ErrorDisplay";
import useUserContext from "../../hooks/useUserContext";

/**
 * Mobile version of the main page rendering the GroupsList only that then navigates to the MobileMessengerPage
 */
const MobileMainPage = () => {
  // Get user from context
  const { user } = useUserContext();

  // Get user updates
  const { fetchUserUpdates } = useUpdateUserData();

  // Update user data on mount
  useEffect(() => {
    fetchUserUpdates();
  }, [fetchUserUpdates]);

  // FetchUserUpdates every 60 seconds
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
      <PiratePxPageRender COUNT_IDENTIFIER={"main-mobile"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - main' />
      <ErrorDisplay error={error} />
      <div className={styles.groupsList}>
        <GroupsContainer user={user} />
      </div>
    </main>
  );
};

export default MobileMainPage;
