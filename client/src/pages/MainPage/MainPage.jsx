import styles from "./MainPage.module.css";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import useUserContext from "../../context/useUserContext";

const MainPage = () => {
  const { user } = useUserContext();
  console.log(user);
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
        <p>
          Logged in user is member of at least one group. Thus, chat application
          will be rendered here eventually.
        </p>
      )}
    </main>
  );
};

export default MainPage;
