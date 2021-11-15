import React, { useRef, useState } from "react";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import DeleteIndie from "./DeleteIndie";
import EditIndie from "./EditIndie";

const SearchForDelete = (props) => {
  const [deleteBackdropStatus, setdeleteBackdropStatus] = useState(false);
  const [error, setError] = useState();
  const enteredIndieName = useRef();

  const deleteIndieMoalCloseHandler = (event) => {
    setdeleteBackdropStatus(false);
  };

  const deleteIndieModalOpenHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/indie/${enteredIndieName.current.value}`
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
    <div>
      <form onSubmit={deleteIndieModalOpenHandler}>
        <label for="indieName">삭제할 인디의 이름 : </label>
        <input type="text" name="indieName" ref={enteredIndieName} />
        <button>🔍</button>
      </form>
      {deleteBackdropStatus && (
        <Backdrop onClick={deleteIndieMoalCloseHandler} />
      )}
      {deleteBackdropStatus && (
        <DeleteIndie
          onClick={deleteIndieMoalCloseHandler}
          indieName={enteredIndieName.current.value}
        />
      )}
    </div>
  );
};

export default SearchForDelete;
