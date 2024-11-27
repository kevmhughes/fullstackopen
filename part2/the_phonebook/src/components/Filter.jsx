import React from "react";

const Filter = ({ handleFilteredPersons }) => {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      filter shown with:
      <input
        type="text"
        onChange={handleFilteredPersons}
        placeholder="Search by name"
      />
    </div>
  );
};

export default Filter;
