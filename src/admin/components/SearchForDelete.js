import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../shared/components/context/auth-context";
import ErrorModal from "../../shared/components/error/ErrorModal";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import DeleteIndie from "./DeleteIndie";

import "./SearchForDelete.css";

const SearchForDelete = (props) => {
  const auth = useContext(AuthContext);
  const [deleteBackdropStatus, setdeleteBackdropStatus] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const enteredIndieName = useRef();

  const focusedInputHandler = () => {
    props.focusedEditInput();
  };

  const blurInputHandler = () => {
    props.blurredEditInput();
  };

  const deleteIndieMoalCloseHandler = (event) => {
    setdeleteBackdropStatus(false);
    enteredIndieName.current.value = "";
  };

  const errorModalCloseHandler = () => {
    setError(false);
  };

  const deleteIndieModalOpenHandler = async (event) => {
    event.preventDefault();
    if (enteredIndieName.current.value !== "") {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/indie/${enteredIndieName.current.value}`,
          {
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
    }
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      <div className="search-delete__container">
        <form
          className="search-delete__form"
          onSubmit={deleteIndieModalOpenHandler}
        >
          <label htmlFor="indieName">삭제할 Indie</label>
          <div className="search-delete-input__container">
            <input
              type="text"
              name="indieName"
              ref={enteredIndieName}
              onFocus={focusedInputHandler}
              onBlur={blurInputHandler}
            />
            <button>
              <span role="img" aria-label="search">
                🔍
              </span>
            </button>
          </div>
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
    </React.Fragment>
  );
};

export default SearchForDelete;
