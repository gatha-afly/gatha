import React from "react";
import logoImage from "../../../../public/small-logo-w-background-wo-slogan.png";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

/**
 * Clickable app logo image that navigates to the home page.
 */
const Logo = () => {
  return (
    <Link to='/'>
      <img src={logoImage} alt='Logo' className={styles.logo} />
    </Link>
  );
};

export default Logo;
