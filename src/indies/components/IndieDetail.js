import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "./IndieDetail.css";

const IndieDetail = (props) => {
  return (
    <div className="detail">
      <div className="detail-container__body">
        <div className="detail-container__left">
          <div className="detail-img" />
          <div className="detail-favorite">
            <div className="detail-like">Like</div>
            <div className="detail-bookmark">Bookmark</div>
          </div>
        </div>
        <div className="detail-container__right">
          <span className="detail-desc">
            국적 : 대한민국 <br />
            <br />
            활동유형 : 여성, 솔로 <br />
            <br />
            활동년대 : 2010 <br />
            <br />
            활동장르: 인디음악, 발라드, 댄스 <br />
            <br />
            생일 : 1994.05.23
          </span>
        </div>
      </div>
      <div className="detail-container__footer">
        <Link
          className="detail-support"
          to={`/indie/${props.name}/support`}
          exact
        >
          {props.name} 에게,
        </Link>
        <div className="detail-sns">SNS</div>
      </div>
    </div>
  );
};

export default IndieDetail;
