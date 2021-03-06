import React, { useContext, useState } from "react";
import Button from "../../shared/components/UIElements/Button";
import { AuthContext } from "../../shared/components/context/auth-context";
import { useParams } from "react-router";

import "./DeleteSupportMsg.css";
import ErrorModal from "../../shared/components/error/ErrorModal";

const DeleteSupportMsg = (props) => {
  const [deleteConfirmStatus, setDeleteConfirmStatus] = useState(false);
  const auth = useContext(AuthContext);
  const params = useParams();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const errorModalCloseHandler = () => {
    setError(false);
  };

  const deleteConfirmBtnHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/indie/${params.indieId}/support`,
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
        <div className="support-message-delete-modal">
          <div className="support-message-delete-modal-form">
            <div>정말 삭제하시겠습니까?</div>
            <div className="support-message-delete-modal-confirmBtn">
              <Button
                className="support-message-delete-modal-confirmBtn__button"
                onClick={deleteConfirmBtnHandler}
              >
                예
              </Button>
              <Button
                className="support-message-delete-modal-confirmBtn__button"
                onClick={deleteCancelBtnHandler}
              >
                아니오
              </Button>
            </div>
          </div>
        </div>
      )}
      {deleteConfirmStatus && (
        <div className="support-message-delete-modal">
          <div className="support-message-delete-modal-form">
            <div>메세지가 삭제되었습니다.</div>
            <Button onClick={deleteOkBtnHandler}>확인</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteSupportMsg;
