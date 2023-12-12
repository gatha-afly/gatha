import React, { useState } from "react";
import styles from "./GroupDetailsEditor.module.css";

/**
 * Editable component for group name and description.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.value - The initial value of the input.
 * @param {Function} props.onSave - Callback function to be executed when save button is clicked.
 * @param {Function} props.onCancel - Callback function to be executed when cancel button is clicked.
 * @returns {JSX.Element} - The rendered component.
 */
const GroupDetailsEditor = ({ value, onSave, onCancel }) => {
  const [editedValue, setEditedValue] = useState(value);

  const handleSave = async () => {
    await onSave(editedValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className={styles.groupDetailsEditor}>
      <div className={styles.inputContainer}>
        <input
          type='text'
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className={styles.buttons}>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default GroupDetailsEditor;
