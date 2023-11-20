import React from "react";
import Icon from "../../../../public/spinner.png";
import styles from "./Spinner.module.css";

/**
 * Loading gatha icon spinner with optional width.
 *
 * @param {number} [props.width=4] - The width of the spinner in rem units. Default is 4.
 * @returns {JSX.Element} - React component.
 */
const Spinner = ({ width = 4 }) => {
  return (
    <div className={styles.spinnerContainer}>
      <img
        src={Icon}
        alt='loading-spinner'
        className={styles.spinner}
        style={{ width: `${width}rem`, height: "auto" }}
      />
    </div>
  );
};

export default Spinner;
