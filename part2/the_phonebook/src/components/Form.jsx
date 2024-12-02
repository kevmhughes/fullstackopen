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
      className="wide"
    >
      <div>
        <div className="flex-container">
          Name:
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
            placeholder="Write a name here..."
          />
        </div >
        <div className="flex-container">
          Number:
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
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
