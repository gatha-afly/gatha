import React, { useState } from "react";
import { Link } from "react-router-dom";
import HamburgerUsernameInitials from "../HamburgerUsernameInitials/HamburgerUsernameInitials";
import styles from "./HamburgerMenu.module.css";

/** * Responsive hamburger menu displaying the initials of a user icon.
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

  // Close the menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    // Close menu when cursor leaves menu
    <div className={styles.hamburgerMenu} onMouseLeave={closeMenu}>
      <div
        className={`${styles.menuIcon} ${menuOpen ? styles.open : ""}`}
        // Show menu when cursor hovers initials
        onMouseEnter={toggleMenu}>
        {/* Display user initials */}
        <HamburgerUsernameInitials firstName={firstName} lastName={lastName} />
      </div>

      {menuOpen && (
        <div className={styles.menuItems} onClick={toggleMenu}>
          <Link to='/main'>gatha</Link>
          <Link to='/user-profile'>profile</Link>
          <Link to='/join-group'>join group</Link>
          <Link to='/create-group'>create group</Link>
          <Link to='/user-logout'>logout</Link>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
