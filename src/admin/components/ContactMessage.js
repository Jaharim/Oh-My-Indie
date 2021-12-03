import React, { Fragment, useState } from "react";
import Backdrop from "../../shared/components/UIElements/Backdrop";

import "./ContactMessage.css";

const ContactMessage = (props) => {
  return (
    <div className="message">
      <div className="message-container">
        <div className="message-title__container">
          <div className="message-title">{props.title}</div>
        </div>
        <div className="message-body">{props.content}</div>
        <div className="message-nickname">{props.nickname}</div>
      </div>
    </div>
  );
};

export default ContactMessage;
