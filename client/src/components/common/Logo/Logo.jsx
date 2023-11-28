import React from "react";
import logoImageWithBackground from "../../../../public/small-logo-wo-background-wo-slogan.png";
import logoImageWithoutBackground from "../../../../public/small-logo-w-background-wo-slogan.png";
import logoImageWithSloganWithBackground from "../../../../public/logo-with-slogan-w-background.png";
import logoImageWithSloganWithoutBackground from "../../../../public/logo-with-slogan-wo-background.png";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

/**
 * Clickable app logo image that navigates to the home page.
 * @param {boolean} withBackground - Specify whether to include the background in the image for small logos.
 * @param {boolean} largeLogoWithBackground - Specify whether to include the background in the image for large logos.
 */
const Logo = ({ withBackground = true }) => {
  const screenWidth = window.innerWidth;
  let logoImage;

  if (screenWidth >= 1025) {
    logoImage = withBackground
      ? logoImageWithSloganWithoutBackground
      : logoImageWithSloganWithBackground;
  } else {
    logoImage = withBackground
      ? logoImageWithBackground
      : logoImageWithoutBackground;
  }

  return (
    <Link to='/'>
      <img src={logoImage} alt='Logo' className={styles.logo} />
    </Link>
  );
};

export default Logo;
