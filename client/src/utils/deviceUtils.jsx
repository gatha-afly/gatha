/**
 * Checks if the window width is less than or equal to 768 pixels to determine if it's a mobile device.
 * @returns {boolean}
 */
export const isMobile = window.innerWidth <= 768;

/**
 * Checks if the window width is greater than or equal to 1025 pixels to determine if it's big screen device.
 * @returns {boolean}
 */ export const isBigScreen = window.innerWidth >= 1025;
