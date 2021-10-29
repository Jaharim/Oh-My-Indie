import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import "./IndieDetail.css";

const IndieDetail = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const heartClickHandler = () => {
    if (!isClicked) setIsClicked(true);
    else setIsClicked(false);
  };

  return (
    <div className="detail">
      <div className="detail-container__body">
        <div className="detail-container__left">
          <div className="detail-img" />
          <div className="detail-favorite">
            <div className="detail-like__container">
              <div
                className={`${
                  !isClicked
                    ? "detail-like__image"
                    : "detail-like__image-active"
                }`}
                onClick={heartClickHandler}
              />
              <div
                className={`${
                  !isClicked
                    ? "detail-like__number"
                    : "detail-like__number-active"
                }`}
              >
                1234
              </div>
            </div>
            <div className="detail-container__support">
              <Link
                className="detail-support"
                to={`/indie/${props.name}/support`}
                exact
              >
                Indie 에게,
              </Link>
            </div>
          </div>
        </div>
        <div className="detail-container__right">
          <span className="detail-desc">
            <div className="detail-desc__contents">
              <p>소속사 : </p>매직 스트로베리 사운드
            </div>
            <br />
            <div className="detail-desc__contents">
              <p>대표곡 : </p>사라져
            </div>
            <br />
            <div className="detail-desc__contents">
              <p>생일 : </p>1994.05.23
            </div>
            <br />
            가나다라 마바사 아자차카 타파하
            <br />
            내란애라냉라내라냉라내알대ㅏ래 발배답
            <br />
            Shining Star~ 밤 하늘의 Pearl~~~
            <br />
            너의 루이비똥~ 루이비 또오옹
            <br />
            똥똥또로동
          </span>
          <div className="detail-container__footer">
            <div className="detail-container__sns">
              <div className="detail-sns__youtube" />
              <div className="detail-sns__instagram" />
              <div className="detail-sns__soundcloud" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndieDetail;
