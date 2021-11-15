import React, { useRef, useState } from "react";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import EditIndie from "./EditIndie";

const SearchForEdit = (props) => {
  const [editBackdropStatus, setEditBackdropStatus] = useState(false);
  const [searchedData, setSearchedData] = useState();
  const [error, setError] = useState();
  const enteredIndieName = useRef();

  const editIndieMoalCloseHandler = (event) => {
    setEditBackdropStatus(false);
  };

  const searchEditHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/indie/${enteredIndieName.current.value}`
      );

      const responseData = await response.json();

      setSearchedData(responseData);

      if (!response.ok) {
        throw new Error("response is not ok");
      }

      setEditBackdropStatus(true);
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again");
    }
  };

  return (
    <div>
      <form onSubmit={searchEditHandler}>
        <label for="indieName">정보를 수정할 인디의 이름 : </label>
        <input type="text" name="indieName" ref={enteredIndieName} />
        <button>🔍</button>
      </form>
      {editBackdropStatus && <Backdrop onClick={editIndieMoalCloseHandler} />}
      {editBackdropStatus && (
        <EditIndie
          indieName={enteredIndieName.current.value}
          indieInformForEdit={searchedData}
        />
      )}
    </div>
  );
};

export default SearchForEdit;
