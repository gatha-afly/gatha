import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./NavigateButton.module.css";

/**
 * Button component for programmatically navigating to a specified route, rendering either a text or a font awesome icon
 * @param {Object} props - The component props.
 * @param {string} props.route - The route to navigate to (format: navigate(`/${route}`).
 * @param {string} props.buttonText - The to be rendered text or the name of the to be rendered fontawesome icon.
 * @param {boolean} [props.isIcon=false] - Indicates whether the buttonText is an icon.
 * @returns {JSX.Element} - The rendered button component.
 */
export default function NavigateButton({ route, buttonText, isIcon = false }) {
  // Access navigation function
  const navigate = useNavigate();

  // Navigate to specified route upon click
  const handleNextClick = () => {
    navigate(`/${route}`);
  };

  return (
    // Render the button
    <button className={styles.button} onClick={handleNextClick}>
      {isIcon ? (
        // Render an icon using FontAwesome if isIcon is true
        <FontAwesomeIcon icon={buttonText} />
      ) : (
        buttonText // Else render as text
      )}
    </button>
  );
}
