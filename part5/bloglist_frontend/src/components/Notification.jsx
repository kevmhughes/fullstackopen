import React from "react";

const Notification = ({ errorMessage, message }) => {
  if (message === null && errorMessage === null) {
    return null;
  }

  return <div>{message || errorMessage}</div>;
};

export default Notification;
