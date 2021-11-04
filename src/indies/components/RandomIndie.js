import React from "react";

import "./RandomIndie.css";

const RandomIndie = (props) => {
  // Random 으로 DB에서 Indie 한 명을 가져오는 경우

  return (
    <div className="searched-container" onClick={props.onClick}>
      <img className="searched-image" src={props.imageUrl} />
      <span className="searched-name">{props.name}</span>
      <div className="searched-like__container">
        <div className="searched-like__image" />
        <div className="searched-like__number">{props.likeNumber}</div>
      </div>
    </div>
  );
};

export default RandomIndie;
