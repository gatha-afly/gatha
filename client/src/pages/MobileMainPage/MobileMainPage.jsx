import styles from "./MobileMainPage.module.css";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import useUserContext from "../../context/useUserContext";
import GroupsContainer from "../../components/features/Groups/GroupsContainer/GroupsContainer";
import useUpdateUserData from "../../hooks/useUpdateUser";
import { useEffect } from "react";
import ErrorDisplay from "../../components/common/ErrorDisplay/ErrorDisplay";
import Spinner from "../../components/common/Spinner/Spinner";

/**
 * Mobile version of the main page rendering the GroupsList only that then navigates to the MobileMessengerPage
 */
const MobileMainPage = () => {
  // Get user from context
  const { user } = useUserContext();
  // Get user updates, loading, and error from custom hook
  const { fetchUserUpdates, loading, error } = useUpdateUserData();

  // Update user data on mount
  useEffect(() => {
    fetchUserUpdates();
  }, [fetchUserUpdates]);

  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"main-mobile"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - main' />
      <ErrorDisplay error={error} />
      {loading ? (
        // Display Spinner while user data is fetched
        <Spinner />
      ) : (
        // Display groups once data is loaded
        <>
          <h1>gatha - get together</h1>
          <div className={styles.groupsList}>
            <GroupsContainer user={user} />
          </div>
        </>
      )}
    </main>
  );
};

export default MobileMainPage;
