import React, { Fragment, useState } from "react";
import Backdrop from "../../shared/components/UIElements/Backdrop";

import "./ContactMessage.css";

const ContactMessage = (props) => {
  const deleteContactMessageHandler = (props) => {};
  return (
    <div className="message">
      <div className="message-container">
        <div className="message-title__container">
          <div className="message-title">{props.title}</div>
          <div
            className="message-delete__btn"
            onClick={deleteContactMessageHandler}
          />
        </div>
        <div className="message-body">{props.content}</div>
        <div className="message-nickname">{props.nickname}</div>
      </div>
    </div>
  );
};

export default ContactMessage;
