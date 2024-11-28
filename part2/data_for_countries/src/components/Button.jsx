import React from "react";

const Button = ({ handleClick, toggleShowButton }) => {
  return (
    <button onClick={handleClick}>{toggleShowButton ? "show" : "hide"}</button>
  );
};

export default Button;
