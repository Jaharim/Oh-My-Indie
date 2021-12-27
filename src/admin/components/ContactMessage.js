import React, { useState } from "react";

import "./ContactMessage.css";
import { useAuth } from "../../shared/components/context/auth-hook";
import DeleteContactMsg from "./DeleteContactMsg";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import AddReply from "./AddReply";
import Reply from "./Reply";
import ErrorModal from "../../shared/components/error/ErrorModal";

const ContactMessage = (props) => {
  const { isAdmin } = useAuth();
  const [replyModalStatus, setReplyModalStatus] = useState(false);
  const [addReplyModalStatus, setAddReplyModalStatus] = useState(false);
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  let replyStatus;

  const addReplyBtnHandler = () => {
    setAddReplyModalStatus(true);
  };

  const closeAddReplyBtnHandler = () => {
    setAddReplyModalStatus(false);
  };

  const replyCompleteHandler = () => {
    props.onReplied();
    setAddReplyModalStatus(false);
  };

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

  const openReplyModalHandler = () => {
    setReplyModalStatus(true);
  };

  const replyModalCloseHandler = () => {
    setReplyModalStatus(false);
  };

  let replyBtnRef;
  if (props.addReply) {
    replyBtnRef = true;
  }

  if (!isAdmin && props.replyStatus) {
    replyStatus = (
      <div className="message-replied__user" onClick={openReplyModalHandler}>
        답변완료
      </div>
    );
  } else if (!isAdmin) {
    replyStatus = "답변대기";
  } else if (isAdmin && !replyBtnRef) {
    replyStatus = (
      <div className="message-replied__admin" onClick={openReplyModalHandler}>
        {props.nickname} ( 답변보기 )
      </div>
    );
  } else {
    replyStatus = props.nickname;
  }
  return (
    <div className="message">
      <div className="message-container">
        <div className="message-title__container">
          <div className="message-title">{props.title}</div>
          <div className="message-button__container">
            {isAdmin && replyBtnRef && (
              <div
                className="message-button__reply"
                onClick={addReplyBtnHandler}
              />
            )}
            <div
              className="message-button__delete"
              onClick={deleteContactMessageHandler}
            />
          </div>
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

      {replyModalStatus && <Backdrop onClick={replyModalCloseHandler} />}
      {replyModalStatus && (
        <Reply props={props} onClose={replyModalCloseHandler} />
      )}

      {addReplyModalStatus && <Backdrop onClick={closeAddReplyBtnHandler} />}
      {addReplyModalStatus && (
        <AddReply
          props={props}
          onSubmit={replyCompleteHandler}
          onCancel={closeAddReplyBtnHandler}
        />
      )}
    </div>
  );
};

export default ContactMessage;
