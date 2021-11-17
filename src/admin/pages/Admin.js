import React, { useState } from "react";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import AddIndie from "../components/AddIndie";
import SearchForDelete from "../components/SearchForDelete";
import SearchForEdit from "../components/SearchForEdit";

import "./Admin.css";

const Admin = (props) => {
  const [addBackdropStatus, setAddBackdropStatus] = useState(false);
  const [deleteBackdropStatus, setDeleteBackdropStatus] = useState(false);

  const addIndieModalOpenHandler = (event) => {
    event.preventDefault();
    setAddBackdropStatus(true);
  };

  const addIndieModalCloseHandler = (event) => {
    event.preventDefault();
    setAddBackdropStatus(false);
  };

  const addIndieHandler = (event) => {
    console.log("good");
    setAddBackdropStatus(false);
  };

  const editIndieHandler = (event) => {};

  return (
    <div className="admin-menu__container">
      <div className="admin-menu-addIndie__container">
        <div
          className="admin-menu-addIndie__text"
          onClick={addIndieModalOpenHandler}
        >
          Indie 추가
        </div>
        {addBackdropStatus && <Backdrop onClick={addIndieModalCloseHandler} />}
        {addBackdropStatus && (
          <AddIndie className="addIndie-modal" onSubmit={addIndieHandler} />
        )}
      </div>
      <div className="admin-menu-editIndie__container">
        <SearchForEdit onSubmit={editIndieHandler} />
      </div>
      <div className="admin-menu-deleteIndie__container">
        <SearchForDelete />
      </div>
    </div>
  );
};

export default Admin;
