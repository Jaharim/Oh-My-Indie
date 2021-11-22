import React, { useContext, useState } from "react";
import Button from "../../shared/components/UIElements/Button";
import { AuthContext } from "../../shared/components/context/auth-context";

import "./DeleteIndie.css";

const DeleteIndie = (props) => {
  const auth = useContext(AuthContext);
  const [deleteBackdropStatus, setdeleteBackdropStatus] = useState(false);
  const [error, setError] = useState();
  const deleteIndieModalCloseHandler = (event) => {
    event.preventDefault();
    props.onClick();
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

      if (!response.ok) {
        throw new Error("response is not ok");
      }

      setdeleteBackdropStatus(true);
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again");
    }
  };

  return (
    <div className="deleteIndie-modal__container">
      {!deleteBackdropStatus && (
        <div className="deleteIndie-modal__confirm">
          <div>정말로 {props.indieName}의 데이터를 삭제하시겠습니까?</div>
          <div className="deleteIndie-modal__confirm-button__container">
            <Button onClick={deleteIndieHandler}>Yes</Button>
            <Button onClick={deleteIndieModalCloseHandler}>No</Button>
          </div>
        </div>
      )}
      {deleteBackdropStatus && (
        <div className="deleteIndie-modal__ok">
          <div>{props.indieName}의 데이터를 삭제하였습니다.</div>
          <Button onClick={deleteIndieModalCloseHandler}>OK</Button>
        </div>
      )}
    </div>
  );
};

export default DeleteIndie;
