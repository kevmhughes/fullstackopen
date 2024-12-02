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
            pattern="^[A-Za-z\s]+$"
            title="Only letters and spaces are allowed."
            required
            minlength="3"
          />
        </div >
        <div className="flex-container">
          Number:
          <input
            type="text"
            value={newNumber}
            onChange={handleNumberChange}
            placeholder="Write a number here..."
            pattern="^\d{2,3}-\d{6,9}$" 
            title="Enter a number in the format: 12-123456789 (2-3 digits, hyphen, 6-9 digits)."
            required
            minlength="8"
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
