import { useEffect, useRef } from "react";

/**
 * Custom React hook to perform a callback when the selected group changes.
 * @param {Object} selectedGroup - The currently selected group.
 * @param {Function} callback - The callback function to be executed when the selected group changes.
 */
const useSetCallbackWhenSelectedGroupChanges = (selectedGroup, callback) => {
  // Ref to store the previous selected group ID
  const selectedGroupRef = useRef();

  // Effect to trigger the callback when the selected group changes
  useEffect(() => {
    if (
      // Check if there is a previous group ID stored in selectedGroupRef.current
      // and if the current group ID (selectedGroup.groupId) is different from the previous one
      selectedGroupRef.current &&
      selectedGroup.groupId !== selectedGroupRef.current
    ) {
      // Execute the specified callback
      callback();
    }
  }, [selectedGroup, callback]);

  // Effect to update the ref when the selected group changes
  useEffect(() => {
    selectedGroupRef.current = selectedGroup.groupId;
  }, [selectedGroup]);
};

export default useSetCallbackWhenSelectedGroupChanges;
