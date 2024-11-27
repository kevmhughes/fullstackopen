import React from "react";

const Filter = ({ handleFilter }) => {
  return (
    <div>
      find countries{" "}
      <input
        type="text"
        onChange={handleFilter}
        placeholder="search here..."
      />
    </div>
  );
};

export default Filter;
