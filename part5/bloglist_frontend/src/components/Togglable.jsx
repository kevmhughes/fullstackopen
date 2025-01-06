import { useState } from "react";

const Togglable = ({
  buttonLabel,
  children,
  blogFormVisible,
  setBlogFormVisible,
  hideWhenVisible,
  showWhenVisible,
}) => {
  const toggleVisibility = () => {
    setBlogFormVisible(!blogFormVisible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
