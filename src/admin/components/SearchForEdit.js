import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../shared/components/context/auth-context";
import ErrorModal from "../../shared/components/error/ErrorModal";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import EditIndie from "./EditIndie";

import "./SearchForEdit.css";

const SearchForEdit = (props) => {
  const auth = useContext(AuthContext);
  const [editBackdropStatus, setEditBackdropStatus] = useState(false);
  const [searchedData, setSearchedData] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const enteredIndieName = useRef();

  const editIndieMoalCloseHandler = (event) => {
    setEditBackdropStatus(false);
    enteredIndieName.current.value = "";
  };

  const errorModalCloseHandler = () => {
    setError(false);
  };

  const searchEditHandler = async (event) => {
    event.preventDefault();
    if (enteredIndieName.current.value !== "") {
      try {
        const response = await fetch(
          `http://localhost:5000/indie/${enteredIndieName.current.value}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        const responseData = await response.json();
        const responseImg = `http://localhost:5000/${responseData.image}`;
        responseData.image = responseImg;
        setSearchedData(responseData);
        if (!response.ok) {
          throw new Error("response is not ok");
        }

        setEditBackdropStatus(true);
      } catch (err) {
        setErrorMsg(err.message);
        setError(true);
      }
    }
  };
  return (
    <React.Fragment>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      <div className="search-edit__container">
        <form className="search-edit__form" onSubmit={searchEditHandler}>
          <label for="indieName">수정할 Indie</label>
          <div className="search-edit-input__container">
            <input type="text" name="indieName" ref={enteredIndieName} />
            <button>🔍</button>
          </div>
        </form>
        {editBackdropStatus && <Backdrop onClick={editIndieMoalCloseHandler} />}
        {editBackdropStatus && (
          <EditIndie
            indieName={enteredIndieName.current.value}
            indieInformForEdit={searchedData}
            onClick={editIndieMoalCloseHandler}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default SearchForEdit;
