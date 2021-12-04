import React, { Fragment } from "react";
import { useHistory } from "react-router";

import "./MyPage.css";

const MyPage = (props) => {
  const history = useHistory();
  const openSupportMsgHandler = () => {
    history.push("/mypage/support");
  };

  const openContactMsgHandler = () => {
    history.push("/mypage/contact");
  };
  return (
    <div className="admin__container">
      <div className="admin-menu__container">
        <div className="myPage-menu-addIndie__container">
          <div
            className="myPage-menu-addIndie__text"
            onClick={openSupportMsgHandler}
          >
            Support Message
          </div>
        </div>
        <div className="myPage-menu-addIndie__container">
          <div
            className="myPage-menu-addIndie__text"
            onClick={openContactMsgHandler}
          >
            Contact Message
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
