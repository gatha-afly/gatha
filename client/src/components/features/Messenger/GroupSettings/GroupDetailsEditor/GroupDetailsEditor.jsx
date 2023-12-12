import React, { useState } from "react";
import styles from "./GroupDetailsEditor.module.css";

const GroupDetailsEditor = ({ value, onSave, onCancel }) => {
  const [editedValue, setEditedValue] = useState(value);

  const handleSave = () => {
    onSave(editedValue);
  };

  return (
    <div className={styles.groupDetailsEditor}>
      <div className={styles.inputContainer}>
        <input
          type='text'
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
        />
      </div>
      <div className={styles.buttons}>
        <button onClick={handleSave}>save</button>
        <button onClick={onCancel}>cancel</button>
      </div>
    </div>
  );
};

export default GroupDetailsEditor;
