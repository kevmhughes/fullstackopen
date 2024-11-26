import React from "react";

const Form = ({
  handleAddName,
  handleNameChange,
  handleNumberChange,
  newNumber,
  newName,
}) => {
  return (
    <form
      onSubmit={handleAddName}
      style={{
        display: "flex ",
        flexDirection: "column",
        gap: "4px",
        width: "150px",
      }}
    >
      <div>
        <div style={{ display: "flex", gap: "4px" }}>
          name:
          <input
            style={{ marginBottom: "4px" }}
            type="text"
            value={newName}
            onChange={handleNameChange}
            placeholder="Write a name here..."
          />
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          number:
          <input
            type="text"
            value={newNumber}
            onChange={handleNumberChange}
            placeholder="Write a number here..."
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={!newName || !newNumber}>
          add
        </button>
      </div>
    </form>
  );
};

export default Form;
