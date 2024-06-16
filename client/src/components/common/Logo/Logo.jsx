import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import smallWithoutBackground from "@public/small-logo-wo-background-wo-slogan.png";
import smallWithBackground from "@public/small-logo-w-background-wo-slogan.png";
import bigWithBackground from "@public/logo-with-slogan-w-background.png";
import bigWithoutBackground from "@public/logo-with-slogan-wo-background.png";
import { isBigScreen } from "@utils/deviceUtils";

/**
 * Clickable app logo image that navigates to the home page.
 * @param {boolean} withBackground - Specify whether to include the background in the image for small logos.
 */
const Logo = ({ withBackground = true }) => {
  let logoImage;

  //Render image file with app slogan on bigger screens
  if (isBigScreen) {
    logoImage = withBackground ? bigWithBackground : bigWithoutBackground;
  } else {
    //Render image file without app slogan on smaller screens
    logoImage = withBackground ? smallWithBackground : smallWithoutBackground;
  }

  return (
    <Link to="/">
      <img src={logoImage} alt="Logo" className={styles.logo} />
    </Link>
  );
};

export default Logo;
