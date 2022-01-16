import React from "react";
import Button from "../../shared/components/UIElements/Button";

import "./AskAuth.css";

const AskAuth = (props) => {
  return (
    <div className="askAuth-modal">
      <div className="askAuth-modal-form">
        <span> 로그인 후 이용해주세요.</span>
        <Button onClick={props.onClick}>확인</Button>
      </div>
    </div>
  );
};

export default AskAuth;
