import { useEffect, useRef } from "react";

/**
 * Custom React hook to perform an action when the selected group changes.
 * @param {Object} selectedGroup - The currently selected group.
 * @param {Function} action - The action to be performed when the selected group changes.
 */
const useSetActionWhenSelectedGroupChanges = (selectedGroup, action) => {
  // Ref to store the previous selected group ID
  const selectedGroupRef = useRef();

  // Effect to trigger the action when the selected group changes
  useEffect(() => {
    if (
      // Check if there is a previous group ID stored in selectedGroupRef.current
      // and if the current group ID (selectedGroup.groupId) is different from the previous one
      selectedGroupRef.current &&
      selectedGroup.groupId !== selectedGroupRef.current
    ) {
      // Perform the specified action
      action();
    }
  }, [selectedGroup, action]);

  // Effect to update the ref when the selected group changes
  useEffect(() => {
    selectedGroupRef.current = selectedGroup.groupId;
  }, [selectedGroup]);
};

export default useSetActionWhenSelectedGroupChanges;
