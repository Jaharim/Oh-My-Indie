import React, { useState } from "react";
import Button from "../../shared/components/UIElements/Button";

import "./DeleteIndie.css";

const DeleteIndie = (props) => {
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
    <div className="z-index_test">
      {!deleteBackdropStatus && (
        <div>
          <div>정말로 {props.indieName}의 데이터를 삭제하시겠습니까?</div>
          <Button onClick={deleteIndieHandler}>Yes</Button>
          <Button onClick={deleteIndieModalCloseHandler}>No</Button>
        </div>
      )}
      {deleteBackdropStatus && (
        <div>
          <div>{props.indieName}의 데이터를 삭제하였습니다.</div>
          <Button onClick={deleteIndieModalCloseHandler}>OK</Button>
        </div>
      )}
    </div>
  );
};

export default DeleteIndie;
