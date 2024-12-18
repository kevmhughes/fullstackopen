import React from "react";

const Notification = ({ errorMessage, message }) => {
  if (message === null && errorMessage === null) {
    return null;
  }

  const messageClassname = () => {
    return message ? "success" : "error";
  };

  return <div className={messageClassname()}>{message || errorMessage}</div>;
};

export default Notification;
