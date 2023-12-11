// ReactIconNavigate.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReactIconNavigate.module.css";

/**
 * ReactIconNavigate component rendering react-icons that allow either navigating to a specified route or performing an onClick function.
 *
 * @param {Object} props - The component props.
 * @param {string} props.route - The route to navigate to.
 * @param {Function} props.onClick - The onClick function for the icon.
 * @param {number} props.size - The size of the icon in rem units.
 * @param {React.Component} props.icon - The React icon component to render.
 * @param {number} props.margin - The margin around the icon in rem units.
 * @returns {React.Component} The rendered ReactIconNavigate component.
 */
const ReactIconNavigate = ({
  route,
  onClick,
  size = 2.5,
  icon: IconComponent,
  margin = 0.5,
}) => {
  // Access navigation function
  const navigate = useNavigate();

  // Callback function to navigate to the specified route
  const navigateToRoute = () => {
    navigate(route);
  };

  return (
    <IconComponent
      onClick={onClick || navigateToRoute}
      className={styles.customIcon}
      style={{ fontSize: `${size}rem`, margin: `${margin}rem` }}
    />
  );
};

export default ReactIconNavigate;
