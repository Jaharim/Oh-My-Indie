import React, { Fragment, useState } from "react";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import EditSupportMsg from "./EditSupportMsg";
import DeleteSupportMsg from "./DeleteSupportMsg";

import "./SupportMessage.css";

const SupportMessage = (props) => {
  const [editBtnStatus, setEditBtnStatus] = useState(false);
  const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);

  const messageEditBtnHandler = async () => {
    console.log(props.id);
    setEditBtnStatus(true);
  };

  const messageDeleteBtnHandler = () => {
    setDeleteBtnStatus(true);
  };

  const editModalCloseHandler = () => {
    setEditBtnStatus(false);
  };

  const changeCheckHandler = (props) => {
    props.onEdit();
  };

  return (
    <div className="message">
      <div className="message-container">
        <div className="message-title__container">
          <div className="message-title">{props.title}</div>
          <div className="message-button__container">
            <div
              className="message-button__edit"
              onClick={messageEditBtnHandler}
            />
            <div
              className="message-button__delete"
              onClick={messageDeleteBtnHandler}
            />
          </div>
        </div>
        <div className="message-body">{props.body}</div>
        <div className="message-creator">{props.creator}</div>
      </div>
      {editBtnStatus && <Backdrop onClick={editModalCloseHandler} />}
      {editBtnStatus && (
        <EditSupportMsg
          onSubmit={editModalCloseHandler}
          props={props}
          onEdit={changeCheckHandler}
        />
      )}
      {deleteBtnStatus && <Backdrop />}
      {deleteBtnStatus && <DeleteSupportMsg />}
    </div>
  );
};

export default SupportMessage;
