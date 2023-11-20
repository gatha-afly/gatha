import React from "react";
import logoImage from "../../../../public/small-logo-w-background-wo-slogan.png";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

/**
 * Clickable app logo image that navigates to the home page.
 * @param {number} width - The width of the logo in rem units.
 */
const Logo = ({ width }) => {
  return (
    <Link to='/'>
      <img
        src={logoImage}
        alt='Logo'
        className={styles.logo}
        style={{ width: `${width}rem`, height: "auto" }}
      />
    </Link>
  );
};

export default Logo;
