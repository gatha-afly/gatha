import { useState } from "react";

/**
 * Custom hook for managing password visibility.
 * @returns {Object} - An object containing passwordVisible state and togglePasswordVisibility function.
 */
const usePasswordVisibility = () => {
  // State for managing password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return { passwordVisible, togglePasswordVisibility };
};

export default usePasswordVisibility;
