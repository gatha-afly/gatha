import React from "react";
import styles from "./GroupnameInitial.module.css";

/**
 * Component for displaying the first letter of a groupname as capital letter a circle.
 * @param {Object} props
 * @param {string} props.groupname
 * @param {number} [props.radius=3] - The radius of the circle in rem.
 * @param {number} [props.fontSize=1.5] - The font size of the letter in rem.
 * @param {number} [props.borderWidth=0.4] - The border width of the circle in rem.
 * @component
 */
const GroupnameInitial = ({
  groupname,
  radius = 3,
  fontSize = 1.5,
  borderWidth = 0.4,
}) => {
  // Extract the first letter of the groupname
  const initial = groupname ? groupname.charAt(0).toUpperCase() : "";

  return (
    <div className={styles.initialContainer}>
      {/* Display the initial inside a circle */}
      <div
        className={styles.circle}
        style={{
          width: `${radius}rem`,
          height: `${radius}rem`,
          border: `${borderWidth}rem solid var(--color-structure-elements)`,
        }}>
        <p className={styles.initial} style={{ fontSize: `${fontSize}rem` }}>
          {initial}
        </p>
      </div>
    </div>
  );
};

export default GroupnameInitial;
