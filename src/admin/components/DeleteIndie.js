import React, { useContext, useState } from "react";
import Button from "../../shared/components/UIElements/Button";
import { AuthContext } from "../../shared/components/context/auth-context";

import "./DeleteIndie.css";
import ErrorModal from "../../shared/components/error/ErrorModal";

const DeleteIndie = (props) => {
  const auth = useContext(AuthContext);
  const [deleteBackdropStatus, setdeleteBackdropStatus] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const deleteIndieModalCloseHandler = (event) => {
    event.preventDefault();
    props.onClick();
  };

  const errorModalCloseHandler = () => {
    setError(false);
  };

  const deleteIndieHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/admin/${props.indieName}/deleteIndie`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setdeleteBackdropStatus(true);
    } catch (err) {
      setErrorMsg(err.message);
      setError(true);
    }
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      <div className="deleteIndie-modal__container">
        {!deleteBackdropStatus && (
          <div className="deleteIndie-modal__confirm">
            <div>정말로 {props.indieName}의 데이터를 삭제하시겠습니까?</div>
            <div className="deleteIndie-modal__confirm-button__container">
              <Button
                className="indie-delete-modal-confirmBtn"
                onClick={deleteIndieHandler}
              >
                예
              </Button>
              <Button
                className="indie-delete-modal-confirmBtn"
                onClick={deleteIndieModalCloseHandler}
              >
                아니오
              </Button>
            </div>
          </div>
        )}
        {deleteBackdropStatus && (
          <div className="deleteIndie-modal__ok">
            <div>{props.indieName}의 데이터를 삭제하였습니다.</div>
            <Button onClick={deleteIndieModalCloseHandler}>확인</Button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default DeleteIndie;
