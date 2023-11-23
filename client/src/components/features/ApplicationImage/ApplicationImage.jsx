import React from "react";
import mobileImage from "../../../../public/img-home-medium.webp";
import desktopImage from "../../../../public/img-home.webp";
import style from "./ApplicationImage.module.css";

const ApplicationImage = () => {
  const screenWidth = window.innerWidth;

  return (
    <div className={style.container}>
      <img
        src={screenWidth <= 768 ? mobileImage : desktopImage}
        alt='gatha application'
      />
    </div>
  );
};

export default ApplicationImage;
