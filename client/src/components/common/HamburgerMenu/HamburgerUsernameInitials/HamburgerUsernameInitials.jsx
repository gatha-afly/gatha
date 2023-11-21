import React from "react";
import styles from "./HamburgerUsernameInitials.module.css";

/**
 * Circle with user initials serving as hamburger menu icon.
 * @param {Object} props - The properties of the component.
 * @param {string} props.firstName - The first name of the user for displaying initials.
 * @param {string} props.lastName - The last name of the user for displaying initials.
 */
const HamburgerUsernameInitials = ({ firstName, lastName }) => {
  // Extract the first letter of each name
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";

  return (
    <div className={styles.initialsContainer}>
      {/* Display the initials inside a circle */}
      <div className={styles.circle}>
        <p className={styles.initials}>{firstInitial + lastInitial}</p>
      </div>
    </div>
  );
};

export default HamburgerUsernameInitials;
