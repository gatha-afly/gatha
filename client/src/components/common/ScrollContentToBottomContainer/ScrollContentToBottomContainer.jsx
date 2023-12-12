import React, { useRef, useEffect } from "react";

/**
 * Container that automatically scrolls to the bottom when new content is added.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the scrollable container.
 * @returns {React.Component} The rendered ScrollContentToBottomContainer component.
 */
const ScrollContentToBottomContainer = ({ children }) => {
  // Create a reference for the container element
  const containerRef = useRef();

  useEffect(() => {
    // Scroll to the bottom when the component is mounted or when children change
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [children]);

  // Style for the container, making it scrollable and taking up 100% of its parent's height
  const containerStyle = {
    overflowY: "auto",
    height: "100%",
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      {children}
    </div>
  );
};

export default ScrollContentToBottomContainer;
