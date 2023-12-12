import React from "react";
import styles from "./ErrorDisplay.module.css";

/**
 * Component for displaying an error message.
 * @param {string | object} error - The error message or error object to display.
 */
const ErrorDisplay = ({ error }) => {
  if (!error) {
    return null;
  }

  const errorMessage =
    typeof error === "string" ? error : error.message || "An error occurred";

  return <p className={styles.errorMessage}>{errorMessage}</p>;
};

export default ErrorDisplay;
