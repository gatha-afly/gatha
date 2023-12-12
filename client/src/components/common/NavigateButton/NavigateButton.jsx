import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavigateButton.module.css";

/**
 * Button component for programmatically navigating to a specified route
 * @param {Object} props - The component props.
 * @param {string} props.route - The route to navigate to (format: navigate(`/${route}`).
 * @param {string} props.buttonText - The to be rendered text
 * @returns {JSX.Element} - The rendered button component.
 */
export default function NavigateButton({ route, buttonText }) {
  // Access navigation function
  const navigate = useNavigate();

  // Navigate to specified route upon click
  const handleNextClick = () => {
    navigate(`/${route}`);
  };

  return (
    // Render the button
    <button className={styles.button} onClick={handleNextClick}>
      {buttonText}
    </button>
  );
}
