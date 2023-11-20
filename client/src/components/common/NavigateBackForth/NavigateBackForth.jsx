import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./NavigateBackForth.module.css";

/**
 * NavigateBackForth Component
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} props.buttonText - The icon for the button from FontAwesome
 * @param {string} props.route - The route to navigate to on button click
 * @param {string} [props.alignment="center"] - The alignment of the button (possible values: "left", "right", "center")
 * @param {number} [props.margin=1] - The margin for the button in rem units
 * @param {number} [props.width=3] - The width for the button in rem units
 * @returns {JSX.Element} JSX Element representing the NavigateBackForth component
 */
const NavigateBackForth = ({
  buttonText,
  route,
  alignment = "center",
  margin = 1,
  width = 3,
}) => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate(`/${route}`);
  };

  // Determine & add the appropriate class based on the 'alignment' prop
  let containerClass = styles.container;

  if (alignment === "left") {
    containerClass = `${containerClass} ${styles.leftAligned}`;
  } else if (alignment === "right") {
    containerClass = `${containerClass} ${styles.rightAligned}`;
  } else if (alignment === "center") {
    containerClass = `${containerClass} ${styles.centerAligned}`;
  }

  const buttonStyle = { margin: `${margin}rem`, width: `${width}rem` };

  return (
    <div className={containerClass}>
      <button
        className={styles.button}
        onClick={handleNextClick}
        style={buttonStyle}>
        <FontAwesomeIcon icon={buttonText} />
      </button>
    </div>
  );
};

export default NavigateBackForth;
