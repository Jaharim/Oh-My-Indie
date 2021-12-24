import React from "react";
import Backdrop from "../UIElements/Backdrop";
import Button from "../UIElements/Button";

import "./ErrorModal.css";

const ErrorModal = (props) => {
  const errorModalOkBtnHandler = () => {
    props.onClose();
  };

  return (
    <React.Fragment>
      <Backdrop onClick={errorModalOkBtnHandler} />
      <div className="errorModal-Ok-modal">
        <div className="errorModal-Ok-modal-form">
          <div className="errorModal-message">{props.errorMsg}</div>
          <Button onClick={errorModalOkBtnHandler}>확인</Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ErrorModal;
