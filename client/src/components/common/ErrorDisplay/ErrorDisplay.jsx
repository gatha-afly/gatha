// ErrorDisplay.js
import React from "react";
import styles from "./ErrorDisplay.module.css";

/**
 * Component for displaying an error message.
 * @param {string} error - The error message to display.
 */
const ErrorDisplay = ({ error }) => {
  return error ? <p className={styles.errorMessage}>{error}</p> : null;
};

export default ErrorDisplay;
