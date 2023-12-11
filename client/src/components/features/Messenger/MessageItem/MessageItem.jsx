import React, { useState } from "react";
import { dateFormatter } from "../../../../utils/dateUtils";
import { devLog } from "../../../../utils/errorUtils";
import UsernameInitials from "../../../common/UsernameInitials/UsernameInitials";
import DeleteMessage from "../DeleteMessage/DeleteMessage";
import OnlineStatusIndicator from "../OnlineStatusIndicator/OnlineStatusIndicator";
import styles from "./MessageItem.module.css";

const MessageItem = ({ msg, user, onlineUsers }) => {
  // state for isDeleted boolean
  const [isDeleted, setIsDeleted] = useState(false);
  // Function to update isDeleted state
  const updateIsDeleted = () => {
    setIsDeleted(true);
  };

  devLog("isDeleted:", msg._id, isDeleted);

  return (
    <li
      key={msg._id}
      className={`${styles.message} ${
        msg.sender?.id === user.userId
          ? styles.senderMessage
          : styles.receiverMessage
      }`}>
      <div className={styles.sender}>
        <UsernameInitials
          firstName={msg.sender?.firstName}
          lastName={msg.sender?.lastName}
          radius={"2.6"}
          fontSize={"1.1"}
          borderWidth={"0.4"}
        />
        <span className={styles.sender}>{msg.sender?.username}</span>

        <div className={styles.onlineContainer}>
          <OnlineStatusIndicator
            isOnline={onlineUsers.includes(msg.sender?.id)}
          />
        </div>
        {msg.sender?.id === user.userId && !msg.isDeleted && (
          <DeleteMessage
            senderId={user.userId}
            messageId={msg._id}
            updateIsDeleted={updateIsDeleted}
          />
        )}
      </div>
      <div className={styles.message}>
        {msg.isDeleted || isDeleted ? (
          <p className={styles.deletedMessage}>
            This message has been deleted.
          </p>
        ) : (
          <>{msg.text}</>
        )}
      </div>
      <div className={styles.date}>
        {dateFormatter(new Date(msg.createdAt))}
      </div>
    </li>
  );
};

export default MessageItem;
