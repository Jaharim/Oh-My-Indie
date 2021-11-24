import React, { Fragment, useState } from "react";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import EditSupportMsg from "./EditSupportMsg";
import DeleteSupportMsg from "./DeleteSupportMsg";

import "./SupportMessage.css";

const SupportMessage = (props) => {
  const [editBtnStatus, setEditBtnStatus] = useState(false);
  const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);

  const messageEditBtnHandler = async () => {
    try {
      //여기서 fetch 해서 backend에서 data 넘겨준거 props로 EditSupportMsg component에 넘겨주기
      //EditSupportMsg component에서는 data 받아서 fetch로 modal 에 미리 입력되어있게끔 해주고
      //submit하면 patch 되게 해주기
    } catch (err) {}
    setEditBtnStatus(true);
  };

  const messageDeleteBtnHandler = () => {
    setDeleteBtnStatus(true);
  };

  const editModalCloseHandler = () => {
    setEditBtnStatus(false);
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
      {editBtnStatus && <EditSupportMsg onSubmit={editModalCloseHandler} />}
      {deleteBtnStatus && <Backdrop />}
      {deleteBtnStatus && <DeleteSupportMsg />}
    </div>
  );
};

export default SupportMessage;
