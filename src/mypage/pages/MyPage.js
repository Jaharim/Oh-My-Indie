import React from "react";
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
    <div className="myPage__container">
      <div className="myPage-menu__container">
        <div className="myPage-menu-addIndie__container">
          <div
            className="myPage-menu-addIndie__text"
            onClick={openSupportMsgHandler}
          >
            나의 Support 메시지
            <br />
            <br />
            모아보기
          </div>
        </div>
        <div className="myPage-menu-addIndie__container">
          <div
            className="myPage-menu-addIndie__text"
            onClick={openContactMsgHandler}
          >
            나의 Contact 메시지
            <br />
            <br />
            모아보기
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
