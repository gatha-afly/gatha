import { useEffect, useRef } from "react";

/**
 * Custom React hook to set state when the selected group changes.
 * @param {Object} selectedGroup - The currently selected group.
 * @param {Function} setState - The setState function to update the state in the parent component.
 */
const useSetStateWhenSelectedGroupChanges = (selectedGroup, setState) => {
  // Ref to store the previous selected group ID
  const selectedGroupRef = useRef();

  // Effect to update state when the selected group changes
  useEffect(() => {
    if (
      // Check if there is a previous group ID stored in selectedGroupRef.current
      // and if the current group ID (selectedGroup.groupId) is different from the previous one
      selectedGroupRef.current &&
      selectedGroup.groupId !== selectedGroupRef.current
    ) {
      // Update the state in the parent using the provided setState function
      setState();
    }
  }, [selectedGroup, setState]);

  // Effect to update the ref when the selected group changes
  useEffect(() => {
    selectedGroupRef.current = selectedGroup.groupId;
  }, [selectedGroup]);
};

export default useSetStateWhenSelectedGroupChanges;
