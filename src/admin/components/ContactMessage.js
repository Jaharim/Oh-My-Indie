import React, { useState } from "react";

import "./ContactMessage.css";
import { useAuth } from "../../shared/components/context/auth-hook";
import DeleteContactMsg from "./DeleteContactMsg";
import Backdrop from "../../shared/components/UIElements/Backdrop";

const ContactMessage = (props) => {
  const { isAdmin } = useAuth();
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  let replyStatus;

  const deleteContactMessageHandler = () => {
    setDeleteModalStatus(true);
  };

  const deleteModalCloseHandler = () => {
    setDeleteModalStatus(false);
  };

  const deleteSubmitHandler = () => {
    props.onDelete();
    setDeleteModalStatus(false);
  };

  if (!isAdmin && props.replyStatus) {
    replyStatus = "답변완료";
  } else if (!isAdmin) {
    replyStatus = "답변대기";
  } else {
    replyStatus = props.nickname;
  }
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
        <div className="message-replyStatus">{replyStatus}</div>
      </div>
      {deleteModalStatus && <Backdrop onClick={deleteModalCloseHandler} />}
      {deleteModalStatus && (
        <DeleteContactMsg
          props={props}
          onSubmit={deleteSubmitHandler}
          onCancel={deleteModalCloseHandler}
        />
      )}
    </div>
  );
};

export default ContactMessage;
