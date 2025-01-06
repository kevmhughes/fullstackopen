import React from "react";
import { forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef(
  ({ buttonLabel, children, blogFormVisible, setBlogFormVisible }, refs) => {
    
    const hideWhenVisible = { display: blogFormVisible ? "none" : "" };
    const showWhenVisible = { display: blogFormVisible ? "" : "none" };

    const toggleVisibility = () => {
      setBlogFormVisible(!blogFormVisible);
    };

    useImperativeHandle(refs, () => {
      return {
        toggleVisibility,
      };
    });

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {children}
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
      </div>
    );
  }
);

export default Togglable;
