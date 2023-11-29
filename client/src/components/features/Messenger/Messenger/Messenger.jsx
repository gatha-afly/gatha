import React from "react";
import "./Messenger.module.css";
import io from "socket.io-client";
import useUserContext from "../../../../context/useUserContext";
import styles from "./Messenger.module.css";
import RenderMessages from "../RenderMessages/RenderMessages";
import SendMessage from "../SendMessage/SendMessage";
import GroupSettingBar from "../GroupSettingBar/GroupSettingBar";

// Connecting to the socket.io server
const socketUrl = import.meta.env.VITE_REACT_APP_SOCKET_URL;
const socket = io.connect(socketUrl, {
  withCredentials: true,
});

function Messenger() {
  const { selectedGroup } = useUserContext();
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
          <div className={styles.send}>
            {" "}
            <SendMessage selectedGroup={selectedGroup} socket={socket} />
          </div>
        </>
      ) : (
        <p>Please select a group.</p>
      )}
    </div>
  );
}

export default Messenger;
