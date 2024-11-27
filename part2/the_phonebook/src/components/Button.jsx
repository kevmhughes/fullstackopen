import React from "react";

const Button = ({ handleDeletePerson }) => {
  return <button onClick={handleDeletePerson}>delete</button>;
};

export default Button;
