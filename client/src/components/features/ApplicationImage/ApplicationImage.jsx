import mobileImage from "@public/img-home-medium.webp";
import desktopImage from "@public/img-home.webp";
import style from "./ApplicationImage.module.css";

/**
 * ApplicationImage Component - Displays gatha application image based on the screen width.
 *
 * @component
 * @returns {JSX.Element} - Returns the JSX element representing the ApplicationImage.
 */
const ApplicationImage = () => {
  // Get the current screen width
  const screenWidth = window.innerWidth;

  return (
    <div className={style.container}>
      {/* Display the appropriate image based on the screen width */}
      <img
        src={screenWidth <= 768 ? mobileImage : desktopImage}
        alt="gatha application"
      />
    </div>
  );
};

export default ApplicationImage;
