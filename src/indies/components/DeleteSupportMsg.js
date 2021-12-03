import React, { useContext, useState } from "react";
import Button from "../../shared/components/UIElements/Button";
import { AuthContext } from "../../shared/components/context/auth-context";
import { useParams } from "react-router";

import "./DeleteSupportMsg.css";

const DeleteSupportMsg = (props) => {
  const [deleteConfirmStatus, setDeleteConfirmStatus] = useState(false);
  const auth = useContext(AuthContext);
  const params = useParams();
  const [error, setError] = useState();

  const deleteConfirmBtnHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/indie/${params.indieId}/support`,
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

      if (!response.ok) {
        throw new Error("response is not ok");
      }

      setDeleteConfirmStatus(true);
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again");
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
      {!deleteConfirmStatus && (
        <div className="support-message-delete-modal">
          <div className="support-message-delete-modal-form">
            <div>정말 삭제하시겠습니까?</div>
            <div className="support-message-delete-modal-confirmBtn">
              <Button className="leftBtn" onClick={deleteConfirmBtnHandler}>
                YES
              </Button>
              <Button onClick={deleteCancelBtnHandler}>NO</Button>
            </div>
          </div>
        </div>
      )}
      {deleteConfirmStatus && (
        <div className="support-message-delete-modal">
          <div className="support-message-delete-modal-form">
            <div>메세지가 삭제되었습니다.</div>
            <Button onClick={deleteOkBtnHandler}>OK</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteSupportMsg;
