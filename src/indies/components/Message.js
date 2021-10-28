import React, { Fragment } from "react";

import "./Message.css";

const Message = (props) => {
  return (
    <div className="message">
      <div className="message-container">
        <div className="message-title">{props.title}</div>
        <div className="message-body">{props.body}</div>
        <div className="message-creator">{props.creator}</div>
      </div>
    </div>
  );
};

export default Message;
