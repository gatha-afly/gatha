import React from "react";
import styles from "./ErrorDisplay.module.css";

/**
 * Component for displaying an error message.
 * @param {string | object} error - The error message or error object to display.
 */
const ErrorDisplay = ({ error }) => {
  let errorMessage;

  if (typeof error === "string") {
    errorMessage = error;
  } else if (error instanceof Error) {
    // Extract specific information from the error object
    errorMessage = error.message || "An error occurred";
  } else {
    errorMessage = "An error occurred";
  }

  return errorMessage ? (
    <p className={styles.errorMessage}>{errorMessage}</p>
  ) : null;
};

export default ErrorDisplay;
