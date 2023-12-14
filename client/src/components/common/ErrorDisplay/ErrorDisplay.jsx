import React from "react";
import styles from "./ErrorDisplay.module.css";

/**
 * Component for displaying an error message.
 * @param {Object} props - Component props.
 * @param {string | object} props.error - The error message or error object to display.
 * @param {number} props.remWidth - The width in rem (default is 20).
 */
const ErrorDisplay = ({ error, remWidth = 20 }) => {
  if (!error) {
    return null;
  }

  // Determine the error message to display
  const errorMessage =
    typeof error === "string" ? error : error.message || "An error occurred";

  // Style object for setting the width of the error message container
  const style = {
    width: `${remWidth}rem`,
  };

  return (
    <p className={styles.errorMessage} style={style}>
      {errorMessage}
    </p>
  );
};

export default ErrorDisplay;
