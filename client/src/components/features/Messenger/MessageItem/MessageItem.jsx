import React, { useState } from "react";
import { dateFormatter } from "../../../../utils/dateUtils";
import UsernameInitials from "../../../common/UsernameInitials/UsernameInitials";
import DeleteMessage from "../DeleteMessage/DeleteMessage";
import OnlineStatusIndicator from "../OnlineStatusIndicator/OnlineStatusIndicator";
import styles from "./MessageItem.module.css";

/**
 * Represents an single chat message item.
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.msg - The message object containing message details.
 * @param {Object} props.user - The user object representing the current user.
 * @param {Array} props.onlineUsers - Array of online user IDs.
 * @returns {JSX.Element} - The rendered component.
 */
const MessageItem = ({ msg, user, onlineUsers }) => {
  // State to track if the message is not deleted
  const [isNotDeleted, setIsNotDeleted] = useState(true);

  // Updates the isNotDeleted state, instantly indicating the sender that the message has been deleted.
  const updateIsNotDeleted = () => {
    setIsNotDeleted(false);
  };

  return (
    <li
      key={msg._id}
      className={`${styles.messageContainer} ${
        msg.sender?.id === user.userId
          ? styles.senderMessage
          : styles.receiverMessage
      }`}>
      <div className={styles.sender}>
        <span className={styles.topBar}>
          <span className={styles.nameInfo}>
            <UsernameInitials
              firstName={msg.sender?.firstName}
              lastName={msg.sender?.lastName}
              radius={"2.6"}
              fontSize={"1.1"}
              borderWidth={"0.4"}
            />
            <span className={styles.username}>{msg.sender?.username}</span>
          </span>
        </span>

        <div className={styles.onlineContainer}>
          <span className={styles.onlineStatus}>
            <OnlineStatusIndicator
              isOnline={onlineUsers.includes(msg.sender?.id)}
            />
          </span>
        </div>
      </div>

      <div className={styles.message}>
        {/* Display message text or deleted message notification */}
        {msg.isDeleted || !isNotDeleted ? (
          <p className={styles.deletedMessage}>
            This message has been deleted.
          </p>
        ) : (
          <p>{msg.text}</p>
        )}
      </div>
      <span className={styles.bottomBar}>
        {msg.sender?.id === user.userId && !msg.isDeleted && isNotDeleted && (
          <span className={styles.delete}>
            <DeleteMessage
              senderId={user.userId}
              messageId={msg._id}
              updateIsNotDeleted={updateIsNotDeleted}
            />
          </span>
        )}
        {/* Placeholder for correct element alignment*/}
        <span className={styles.deleted}></span>
        {/* Display message timestamp */}
        <span className={styles.date}>
          {dateFormatter(new Date(msg.createdAt))}
        </span>
      </span>
    </li>
  );
};
export default MessageItem;
