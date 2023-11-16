import React, { useState, useEffect } from "react";

import styles from "./AddUserUponGroupCreationPage.module.css";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import AddUserToGroup from "../../components/features/CreateGroup/AddUserToGroup/AddUserToGroup";
import { useParams } from "react-router-dom";
import RenderGroupMemberList from "../../components/features/CreateGroup/RenderGroupMemberList/RenderGroupMemberList";
import useGetGroupMembers from "../../hooks/useGetGroupMembers";
import ErrorDisplay from "../../components/common/ErrorDisplay/ErrorDisplay";

const AddUserUponGroupCreationPage = () => {
  const { groupId, userId } = useParams();
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const { error, groupName, groupMembers } = useGetGroupMembers(
    groupId,
    refreshTrigger
  );

  // Change refreshTrigger to trigger useGetGroupMembers hook again, so newly group member list is rerendered when after a user has been added
  const handleRefresh = () => {
    setRefreshTrigger((prev) => !prev);
  };

  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"add-user-upon-group-creation"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - add user' />
      <h1>{groupName}</h1>
      <AddUserToGroup
        groupId={groupId}
        userId={userId}
        onRefresh={handleRefresh}
      />
      <ErrorDisplay error={error} />
      <RenderGroupMemberList groupMembers={groupMembers} />
    </main>
  );
};

export default AddUserUponGroupCreationPage;
