import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/components/context/auth-context";
import ErrorModal from "../../shared/components/error/ErrorModal";
import Button from "../../shared/components/UIElements/Button";

import "./DeleteContactMsg.css";

const DeleteContactMsg = (props) => {
  const [deleteConfirmStatus, setDeleteConfirmStatus] = useState(false);
  const auth = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const errorModalCloseHandler = () => {
    setError(false);
  };

  const deleteConfirmBtnHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/contact`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            id: props.props.id,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setDeleteConfirmStatus(true);
    } catch (err) {
      setErrorMsg(err.message);
      setError(true);
    }
  };

  const deleteCancelBtnHandler = (event) => {
    event.preventDefault();
    props.onCancel();
  };

  const deleteOkBtnHandler = (event) => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <div>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      {!deleteConfirmStatus && (
        <div className="contact-message-delete-modal">
          <div className="contact-message-delete-modal-form">
            <div>정말 삭제하시겠습니까?</div>
            <div className="contact-message-delete-modal-confirmBtn">
              <Button
                className="contact-message-delete-modal-confirmBtn__button"
                onClick={deleteConfirmBtnHandler}
              >
                예
              </Button>
              <Button
                className="contact-message-delete-modal-confirmBtn__button"
                onClick={deleteCancelBtnHandler}
              >
                아니오
              </Button>
            </div>
          </div>
        </div>
      )}
      {deleteConfirmStatus && (
        <div className="contact-message-delete-modal">
          <div className="contact-message-delete-modal-form">
            <div>메세지가 삭제되었습니다.</div>
            <Button onClick={deleteOkBtnHandler}>확인</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteContactMsg;
