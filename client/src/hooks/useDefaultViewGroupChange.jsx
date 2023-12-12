import { useEffect, useRef } from "react";

const useDefaultViewOnGroupChange = (selectedGroup, onDefaultViewClick) => {
  // Ref to store the previous selected group ID
  const selectedGroupRef = useRef();

  useEffect(() => {
    // Check if there is a previous groupID stored in selectedGroupRef.current and if the current group ID (selectedGroup.groupId) is different from the previous one
    if (
      selectedGroupRef.current &&
      selectedGroup.groupId !== selectedGroupRef.current
    ) {
      // Render message default view
      onDefaultViewClick();
    }

    // Update the ref with the current group ID for the next comparison
    selectedGroupRef.current = selectedGroup.groupId;
  }, [selectedGroup, onDefaultViewClick]);
};

export default useDefaultViewOnGroupChange;
