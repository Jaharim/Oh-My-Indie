import React, { useState } from "react";
import { useHistory } from "react-router";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import AddIndie from "../components/AddIndie";
import SearchForDelete from "../components/SearchForDelete";
import SearchForEdit from "../components/SearchForEdit";

import "./Admin.css";

const Admin = (props) => {
  let adminContent;
  const history = useHistory();
  const [adminMode, setAdminMode] = useState("indie");
  const [modeButton, setModeButton] = useState(false);
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

  const changeUserModeHandler = () => {
    setAdminMode("user");
    setModeButton(true);
  };

  const changeIndieModeHandler = () => {
    setAdminMode("indie");
    setModeButton(false);
  };

  const openContactAdminModeHandler = () => {
    history.push("/admin/contact");
  };

  if (adminMode === "indie") {
    adminContent = (
      <React.Fragment>
        <div className="admin-menu-addIndie__container">
          <div
            className="admin-menu-addIndie__text"
            onClick={addIndieModalOpenHandler}
          >
            Indie 추가
          </div>
          {addBackdropStatus && (
            <Backdrop onClick={addIndieModalCloseHandler} />
          )}
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
      </React.Fragment>
    );
  } else {
    adminContent = (
      <React.Fragment>
        <div className="admin-menu-addIndie__container">
          <div
            className="admin-menu-addIndie__text"
            onClick={openContactAdminModeHandler}
          >
            Contact 관리
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="admin__container">
        <div className="admin-menu__container">{adminContent}</div>
      </div>
      {!modeButton && (
        <div
          className="adminMode-indie__button"
          onClick={changeUserModeHandler}
        >
          User
        </div>
      )}
      {modeButton && (
        <div
          className="adminMode-user__button"
          onClick={changeIndieModeHandler}
        >
          Indie
        </div>
      )}
    </React.Fragment>
  );
};

export default Admin;
