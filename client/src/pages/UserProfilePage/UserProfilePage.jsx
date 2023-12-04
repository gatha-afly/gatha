import styles from "./UserProfilePage.module.css";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import UserInfo from "../../components/features/UserInfo/UserInfo";
import useUpdateUserData from "../../hooks/useUpdateUser";
import { useEffect } from "react";
import Spinner from "../../components/common/Spinner/Spinner";
import useUserContext from "../../context/useUserContext";
import ErrorDisplay from "../../components/common/ErrorDisplay/ErrorDisplay";

const UserProfilePage = () => {
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
      <PiratePxPageRender COUNT_IDENTIFIER={"user-profile"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - user profile' />
      {/* Display error message if there's an error */}
      <ErrorDisplay error={error} />
      {loading ? (
        // Display Spinner while user data is fetched
        <Spinner />
      ) : (
        // Display user information once data is loaded
        <>
          <h1>{user.username}</h1>
          <UserInfo user={user} />
        </>
      )}
    </main>
  );
};

export default UserProfilePage;
