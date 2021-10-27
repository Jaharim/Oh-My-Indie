import React from "react";

import "./SearchedIndie.css";

const SearchedIndie = (props) => {
  // 1. 사용자가 Input 에 입력한 Indie가 들어오는 경우
  // 2. Random 으로 DB에서 Indie 한 명을 가져오는 경우
  return (
    <div className="searched-container">
      <h2> image </h2>
      <h2> name </h2>
      <h2> like </h2>
      <h2> bookmark</h2>
    </div>
  );
};

export default SearchedIndie;
