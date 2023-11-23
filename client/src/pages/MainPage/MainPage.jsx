import styles from "./MainPage.module.css";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import useUserContext from "../../context/useUserContext";
import useGetGroupData from "../../hooks/useGetGroupData";
import RenderBasicGroupInfo from "../../components/features/BasicGroupInfo/RenderBasicGroupInfo/RenderBasicGroupInfo";
import { array } from "prop-types";

const MainPage = () => {
  // Retrieve user information
  const { user } = useUserContext();
  const userId = user.userId;

  // TODO: Just for testing: Retrieve groupId of latest joined group
  const groupIds = user.groups.map((group) => group._id);
  // console.log(userId, groupIds);
  const groupId = groupIds[groupIds.length - 1];
  console.log(groupId, userId);
  const response = useGetGroupData(groupId, userId);
  const { groupData } = response;
  console.log(groupData);

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
        <div>
          <p>
            Just to show user info component. Currently, info of latest added
            group of the user is rendered:
          </p>
          <RenderBasicGroupInfo groupData={groupData} />
        </div>
      )}
    </main>
  );
};

export default MainPage;
