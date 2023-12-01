import React from "react";
import useUserContext from "../../../../context/useUserContext";
import UsernameInitials from "../../../common/UsernameInitials/UsernameInitials";
import styles from "./IsTypingEffect.module.css";

/**
 *
 * Displays an indicator when a user is typing.
 * @component
 * @returns {JSX.Element} The rendered IsTypingEffect component.
 */

const IsTypingEffect = () => {
  // Access the isTyping and typingUser values from the user context
  const { isTyping, typingUser } = useUserContext();

  return (
    // Render IsTypingEffect component only when isTyping is true
    <>
      {isTyping && (
        <div className={styles.typingIndicatorContainer}>
          <UsernameInitials
            firstName={typingUser.firstName}
            lastName={typingUser.lastName}
            radius={"2.5"}
            fontSize={"1.1"}
            borderWidth={"0.4"}
          />
          {/* Display the "is typing" message */}
          <span className={styles.typingIndicator}>
            {typingUser.username} is typing
          </span>
        </div>
      )}
    </>
  );
};

export default IsTypingEffect;
