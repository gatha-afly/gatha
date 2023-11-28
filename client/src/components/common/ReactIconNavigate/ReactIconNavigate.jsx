import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReactIconNavigate.module.css";

/**
 * ReactIconNavigate component rendering react-icons and navigating to specified route.
 *
 * @param {Object} props - The component props.
 * @param {string} props.route - The route to navigate to.
 * @param {number} props.size - The size of the icon in rem units.
 * @param {React.Component} props.icon - The React icon component to render.
 * @returns {React.Component} The rendered ReactIconNavigate component.
 */
const ReactIconNavigate = ({ route, size, icon: IconComponent }) => {
  // Access navigation function
  const navigate = useNavigate();

  // Callback function to navigate to specified route
  const navigateToRoute = () => {
    navigate(route);
  };

  return (
    <div className={styles.iconContainer}>
      {/* Render the specified React icon component */}
      <IconComponent
        onClick={navigateToRoute}
        className={styles.customIcon}
        style={{ fontSize: `${size}rem` }}
      />
    </div>
  );
};

export default ReactIconNavigate;
