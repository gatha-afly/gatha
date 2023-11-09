import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon

import styles from "./NavigateButton.module.css";

export default function NavigateButton({ route, buttonText, isIcon = false }) {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate(`/${route}`);
  };

  return (
    <button className={styles.button} onClick={handleNextClick}>
      {isIcon ? ( // Check if it's an icon
        <FontAwesomeIcon icon={buttonText} />
      ) : (
        buttonText // Render as text
      )}
    </button>
  );
}
