import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "./IndieDetail.css";

const IndieDetail = (props) => {
  return (
    <div className="detail-container">
      <div className="detail-container__left"></div>
      <div className="detail-img">Image</div>
      <div className="detail-name">{props.name}</div>
      <div className="detail-favorite">Like, Bookmark</div>
      <span className="detail-desc">
        국적대한민국활동유형여성, 솔로활동년대2010활동장르인디음악, 발라드,
        댄스생일1994.05.23
      </span>
      <Link
        className="detail-support"
        to={`/indie/${props.name}/support`}
        exact
      >
        {props.name} 에게,
      </Link>
      <div className="datail-sns">SNS</div>
    </div>
  );
};

export default IndieDetail;
