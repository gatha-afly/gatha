import styles from "./UserProfilePage.module.css";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import useUserContext from "../../context/useUserContext";

const UserProfilePage = () => {
  const { user } = useUserContext();
  console.log(user);
  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"user-profile"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - user profile' />
      <h1>{user.username}</h1>
      <RenderUserInfo user={user} />
    </main>
  );
};

export default UserProfilePage;
