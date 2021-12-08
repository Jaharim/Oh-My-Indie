import React, { Fragment, useContext, useState } from "react";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import EditSupportMsg from "./EditSupportMsg";
import DeleteSupportMsg from "./DeleteSupportMsg";
import { useAuth } from "../../shared/components/context/auth-hook";

import "./SupportMessage.css";

const SupportMessage = (props) => {
  let customBtn;
  let name;
  const { userId, isAdmin } = useAuth();
  const [editBtnStatus, setEditBtnStatus] = useState(false);
  const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);

  const messageEditBtnHandler = () => {
    console.log(props.id);
    setEditBtnStatus(true);
  };

  const messageDeleteBtnHandler = () => {
    setDeleteBtnStatus(true);
  };

  const editModalCloseHandler = () => {
    setEditBtnStatus(false);
  };

  const editSubmitHandler = () => {
    props.onEdit();
    setEditBtnStatus(false);
  };

  const deleteModalCloseHandler = () => {
    setDeleteBtnStatus(false);
  };

  const deleteSubmitHandler = () => {
    props.onDelete();
    setDeleteBtnStatus(false);
  };

  if (props.creator === userId || isAdmin) {
    customBtn = (
      <div className="message-button__container">
        <div className="message-button__edit" onClick={messageEditBtnHandler} />
        <div
          className="message-button__delete"
          onClick={messageDeleteBtnHandler}
        />
      </div>
    );
  }

  if (!isAdmin && props.indieName) {
    name = `To.${props.indieName}`;
  } else if (isAdmin && props.status) {
    name = `To.${props.indieName} by ${props.nickname}`;
  } else {
    name = `${props.nickname}`;
  }

  return (
    <div className="message">
      <div className="message-container">
        <div className="message-title__container">
          <div className="message-title">{props.title}</div>
          {customBtn}
        </div>
        <div className="message-body">{props.body}</div>
        <div className="message-nickname">{name}</div>
      </div>
      {editBtnStatus && <Backdrop onClick={editModalCloseHandler} />}
      {editBtnStatus && (
        <EditSupportMsg
          onSubmit={editSubmitHandler}
          onCancel={editModalCloseHandler}
          props={props}
        />
      )}
      {deleteBtnStatus && <Backdrop onClick={deleteModalCloseHandler} />}
      {deleteBtnStatus && (
        <DeleteSupportMsg
          onSubmit={deleteSubmitHandler}
          onCancel={deleteModalCloseHandler}
          props={props}
        />
      )}
    </div>
  );
};

export default SupportMessage;
