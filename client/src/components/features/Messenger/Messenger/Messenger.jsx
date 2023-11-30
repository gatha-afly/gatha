import React from "react";
import "./Messenger.module.css";
import io from "socket.io-client";
import useUserContext from "../../../../context/useUserContext";
import styles from "./Messenger.module.css";
import RenderMessages from "../RenderMessages/RenderMessages";
import SendMessage from "../SendMessage/SendMessage";
import GroupSettingBar from "../GroupSettingBar/GroupSettingBar";
import UsernameInitials from "../../../common/UsernameInitials/UsernameInitials";

// Connecting to the socket.io server
const socketUrl = import.meta.env.VITE_REACT_APP_SOCKET_URL;
const socket = io.connect(socketUrl, {
  withCredentials: true,
});

function Messenger() {
  const { selectedGroup, isTyping, typingUser } = useUserContext();
  console.log(selectedGroup);

  return (
    <div className={styles.messengerContainer}>
      {selectedGroup ? (
        <>
          <div className={styles.groupBar}>
            <GroupSettingBar selectedGroup={selectedGroup} />
          </div>
          <div className={styles.messages}>
            <RenderMessages selectedGroup={selectedGroup} socket={socket} />
          </div>

          {/* Displays the typing effect */}
          {isTyping && (
            <div className={styles.typingIndicatorContainer}>
              <UsernameInitials
                firstName={typingUser.firstName}
                lastName={typingUser.lastName}
                radius={"2.5"}
                fontSize={"1.1"}
                borderWidth={"0.4"}
              />
              <div className={styles.typingIndicator}>
                {typingUser.username} is typing
              </div>
            </div>
          )}

          <div className={styles.send}>
            {" "}
            <SendMessage selectedGroup={selectedGroup} socket={socket} />
          </div>
        </>
      ) : (
        <p className={styles.selectGroup}>Please select a group.</p>
      )}
    </div>
  );
}

export default Messenger;
