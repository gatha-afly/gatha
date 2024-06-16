import styles from "./PiratePxPageRender.module.css";

// Get piratepx project ID from environment variable
const projectId = import.meta.env.VITE_PIRATEPX_PROJECT_ID;

/**
 * PiratePx component rendering a transparent image to get a simple, privacy-respecting, no cookie, zero JavaScript usage counter. Incremented by one, whenever the page is rendered. No session or single user identification.
 *
 * @param {string} COUNT_IDENTIFIER - Unique identifier for the page/ component/ action to be incremented by one
 * @returns {JSX.Element} - transparent image.
 */
const PiratePxPageRender = ({ COUNT_IDENTIFIER }) => {
  // Don't render anything in development
  if (process.env.NODE_ENV === "development") {
    return null;
  }
  return (
    <img
      className={styles.piratePx}
      src={`https://app.piratepx.com/ship?p=${projectId}&i=${COUNT_IDENTIFIER}`}
      alt=""
    />
  );
};

export default PiratePxPageRender;
