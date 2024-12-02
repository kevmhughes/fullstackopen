import React from "react";

const Filter = ({ handleFilteredPersons }) => {
  return (
    <div className="flex-container">
      Filter:
      <input
        type="text"
        onChange={handleFilteredPersons}
        placeholder="Search by name"
      />
    </div>
  );
};

export default Filter;
