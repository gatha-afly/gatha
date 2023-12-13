import React, { useState } from "react";
import ErrorDisplay from "../../../../common/ErrorDisplay/ErrorDisplay";
import styles from "./GroupDetailsEditor.module.css";

/**
 * Editable component for group name and description.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.value - The initial value of the input.
 * @param {Function} props.onSave - Callback function to be executed when save button is clicked.
 * @param {Function} props.onCancel - Callback function to be executed when cancel button is clicked.
 * @param {number} props.maxCharacters - Maximum number of characters allowed.
 * @returns {JSX.Element} - The rendered component.
 */
const GroupDetailsEditor = ({ value, onSave, onCancel, maxCharacters }) => {
  const [editedValue, setEditedValue] = useState(value);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    // Check if the editedValue is empty
    if (!editedValue.trim()) {
      setError("Field must not be empty");
      return;
    }

    // Clear any previous errors
    setError(null);
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
          maxLength={maxCharacters}
        />
      </div>
      {error && <ErrorDisplay error={error} />}
      <div className={styles.buttons}>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default GroupDetailsEditor;
