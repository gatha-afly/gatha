import { useEffect } from "react";
import styles from "./MobileMessengerPage.module.css";
import HelmetMetaTagsNetlify from "@common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "@common/PiratePxPageRender/PiratePxPageRender";
import MessengerContainer from "@features/Messenger/MessengerContainer/MessengerContainer";
import useUpdateUserData from "@hooks/useUpdateUser";
import ErrorDisplay from "@common/ErrorDisplay/ErrorDisplay";

/**
 *
 * Messenger page for mobile devices.
 * @returns {JSX.Element} - The JSX element representing the mobile messenger page.
 */
const MobileMessengerPage = () => {
  // Get user updates, loading, and error from custom hook
  const { fetchUserUpdates, error } = useUpdateUserData();
  // Update user data on mount
  useEffect(() => {
    fetchUserUpdates();
  }, [fetchUserUpdates]);

  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"main-mobile"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title="gatha - messenger" />
      <ErrorDisplay error={error} />
      <MessengerContainer />
    </main>
  );
};

export default MobileMessengerPage;
