import React from "react";

const Filter = ({ handleFilteredPersonsListChange }) => {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      filter shown with:
      <input
        type="text"
        onChange={handleFilteredPersonsListChange}
        placeholder="Search by name"
      />
    </div>
  );
};

export default Filter;
