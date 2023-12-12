import React from "react";
import styles from "./UsernameInitials.module.css";

/**
 * Component for displaying capital user initials in a circle.
 * @param {Object} props
 * @param {string} props.firstName
 * @param {string} props.lastName
 * @param {number} [props.radius=3.6] - The radius of the circle in rem.
 * @param {number} [props.fontSize=1.8] - The font size of the initials in rem.
 * @param {number} [props.borderWidth=0.5] - The border width of the circle in rem.
 * @component
 */
const UsernameInitials = ({
  firstName,
  lastName,
  radius = 3.6,
  fontSize = 1.8,
  borderWidth = 0.5,
}) => {
  // Extract the first letter of each name
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";

  return (
    <div className={styles.initialsContainer}>
      {/* Display the initials inside a circle */}
      <div
        className={styles.circle}
        style={{
          width: `${radius}rem`,
          height: `${radius}rem`,
          border: `${borderWidth}rem solid var(--color-hover)`,
        }}>
        <p className={styles.initials} style={{ fontSize: `${fontSize}rem` }}>
          {firstInitial + lastInitial}
        </p>
      </div>
    </div>
  );
};

export default UsernameInitials;
