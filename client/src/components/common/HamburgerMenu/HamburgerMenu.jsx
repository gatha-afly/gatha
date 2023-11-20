import React, { useState } from "react";
import { Link } from "react-router-dom";
import UsernameInitials from "../UsernameInitials/UsernameInitials";
import styles from "./HamburgerMenu.module.css";

/** * Responsive hamburger menu displaying the initials of a user as initals icon.
 * @param {Object} props - The properties of the component.
 * @param {string} props.firstName - The first name of the user for displaying initials.
 * @param {string} props.lastName - The last name of the user for displaying initials.
 * @returns {JSX.Element} React component.
 */
const HamburgerMenu = ({ firstName, lastName }) => {
  // State to track the menu's open/closed status
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the menu's open/closed status
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.hamburgerMenu}>
      <div
        className={`${styles.menuIcon} ${menuOpen ? styles.open : ""}`}
        onClick={toggleMenu}>
        {/* Display user initials */}
        <UsernameInitials
          firstName={firstName}
          lastName={lastName}
          radius={6}
          fontSize={2}
        />
      </div>

      {menuOpen && (
        <div className={styles.menuItems}>
          <Link to='/user-logout'>Logout</Link>
          <Link to='/user-logout'>Logout</Link>
          <Link to='/user-logout'>Logout</Link>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
