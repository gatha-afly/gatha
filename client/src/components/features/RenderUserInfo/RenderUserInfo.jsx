import React from "react";
import styles from "./RenderUserInfo.module.css";

const RenderUserInfo = ({ user }) => {
  return (
    <div className={styles.container}>
      <p>
        {user.firstName} {user.lastName}
      </p>
      <div>
        <h3>associated groups:</h3>
        <ul>
          {user.groups.map((group) => (
            <li key={group._id}>{group.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RenderUserInfo;
