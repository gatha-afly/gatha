import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import ReactIconNavigate from "../../components/common/ReactIconNavigate/ReactIconNavigate";
import styles from "./MobileMessengerPage.module.css";
import { FaArrowLeft } from "react-icons/fa";
import MessengerContainer from "../../components/features/Messenger/MessengerContainer/MessengerContainer";
import useUpdateUserData from "../../hooks/useUpdateUser";
import { useEffect } from "react";
import ErrorDisplay from "../../components/common/ErrorDisplay/ErrorDisplay";
import Spinner from "../../components/common/Spinner/Spinner";

/**
 *
 * Renders the messenger interface for mobile devices.
 * @returns {JSX.Element} - The JSX element representing the mobile messenger page.
 */
const MobileMessengerPage = () => {
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
      <HelmetMetaTagsNetlify title='gatha - messenger' />
      <ErrorDisplay error={error} />
      {loading ? (
        // Display Spinner while user data is fetched
        <Spinner />
      ) : (
        // Display Messenger once data is loaded
        <>
          <h1>gatha - get together</h1>
          {/* Messenger component */}
          <MessengerContainer />
          {/* Navigation icon to go back to the main page */}
          <ReactIconNavigate route='/main' size={2.5} icon={FaArrowLeft} />
        </>
      )}
    </main>
  );
};

export default MobileMessengerPage;
