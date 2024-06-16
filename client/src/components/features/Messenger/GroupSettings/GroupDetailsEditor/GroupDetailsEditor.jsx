import { useState } from "react";
import styles from "./GroupDetailsEditor.module.css";
import ErrorDisplay from "@common/ErrorDisplay/ErrorDisplay";

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
  // State to manage the edited value in the input field
  const [editedValue, setEditedValue] = useState(value);
  // State to handle error messages
  const [error, setError] = useState(null);

  // save edited details
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

  /**
   * Trigger save action when Enter key is pressed.
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className={styles.groupDetailsEditor}>
      {/* Input container for editing group details */}
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          onKeyPress={handleKeyPress}
          maxLength={maxCharacters}
        />
      </div>
      {/* Display an error message if there's an error */}
      {error && <ErrorDisplay error={error} />}
      <div className={styles.buttons}>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default GroupDetailsEditor;
