import React from "react";

import "./SearchedIndie.css";

const SearchedIndie = (props) => {
  // 1. 사용자가 Input 에 입력한 Indie가 들어오는 경우
  // 2. Random 으로 DB에서 Indie 한 명을 가져오는 경우

  return (
    <div className="searched-container">
      <div className="searched-image" />
      <span className="searched-name">최정윤</span>
      <div className="searched-like__container">
        <div className="searched-like__image" />
        <div className="searched-like__number">1234</div>
      </div>
    </div>
  );
};

export default SearchedIndie;
