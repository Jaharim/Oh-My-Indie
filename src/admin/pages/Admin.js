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
  const [editIndieStatus, setEditIndieStatus] = useState("");

  const [deleteIndieStatus, setDeleteIndieStatus] = useState("");
  const [adminMode, setAdminMode] = useState("indie");
  const [addBackdropStatus, setAddBackdropStatus] = useState(false);

  const editInputFocusHandler = () => {
    setEditIndieStatus("edit-indie-input-focused");
  };

  const editInputBlurHandler = () => {
    setEditIndieStatus("");
  };

  const deleteInputFocusHandler = () => {
    setDeleteIndieStatus("delete-indie-input-focused");
  };

  const deleteInputBlurHandler = () => {
    setDeleteIndieStatus("");
  };

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

  const changeUserModeHandler = () => {
    setAdminMode("user");
  };

  const changeIndieModeHandler = () => {
    setAdminMode("indie");
  };

  const openContactAdminModeHandler = () => {
    history.push("/admin/contact");
  };

  const openSupportMsgAdminModeHandler = () => {
    history.push("/admin/support");
  };

  const openRepliedContactAdminModeHandler = () => {
    history.push("/admin/contact/complete");
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
            <AddIndie
              className="addIndie-modal"
              onSubmit={addIndieHandler}
              onClose={addIndieModalCloseHandler}
            />
          )}
        </div>
        <div className={`admin-menu-editIndie__container ${editIndieStatus}`}>
          <SearchForEdit
            focusedEditInput={editInputFocusHandler}
            blurredEditInput={editInputBlurHandler}
          />
        </div>
        <div
          className={`admin-menu-deleteIndie__container ${deleteIndieStatus}`}
        >
          <SearchForDelete
            focusedEditInput={deleteInputFocusHandler}
            blurredEditInput={deleteInputBlurHandler}
          />
        </div>
      </React.Fragment>
    );
  } else {
    adminContent = (
      <React.Fragment>
        <div className="admin-menu-addIndie__container">
          <div
            className="admin-menu-addIndie__text"
            onClick={openSupportMsgAdminModeHandler}
          >
            Support 메시지 <br />
            <br /> 모아보기
          </div>
        </div>
        <div className="admin-menu-addIndie__container">
          <div
            className="admin-menu-addIndie__text"
            onClick={openContactAdminModeHandler}
          >
            답변대기중인 Contact 메시지
            <br />
            <br />
            모아보기
          </div>
        </div>
        <div className="admin-menu-addIndie__container">
          <div
            className="admin-menu-addIndie__text"
            onClick={openRepliedContactAdminModeHandler}
          >
            답변완료한 Contact 메시지
            <br />
            <br />
            모아보기
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="admin__container">
        <div className="admin-menu__container">{adminContent}</div>

        <div className="adminMode__container">
          <div
            className="adminMode-indie__button"
            onClick={changeIndieModeHandler}
          >
            Indie
          </div>
          <div
            className="adminMode-contact__button"
            onClick={changeUserModeHandler}
          >
            User
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Admin;
