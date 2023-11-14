/**
 * Logs an error message to the console if the environment is set to development.
 *
 * @param {string} message - The error message to log.
 * @param {Error} error - The error object to log.
 */
export const logDevError = (message, error) => {
  if (process.env.NODE_ENV === "development") {
    console.error(message, error);
  }
};
