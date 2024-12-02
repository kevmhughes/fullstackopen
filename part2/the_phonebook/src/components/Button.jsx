import React from "react";

const Button = ({ handleDeletePerson }) => {
  return (
    <button className="btn" onClick={handleDeletePerson}>
      Delete
    </button>
  );
};

export default Button;
