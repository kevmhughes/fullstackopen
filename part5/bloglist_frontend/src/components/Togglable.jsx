import React from "react";
import { forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

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
      <div className="create-blog-container">
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

Togglable.displayName = "Togglable";

export default Togglable;

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
