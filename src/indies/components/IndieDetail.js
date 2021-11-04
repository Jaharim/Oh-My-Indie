import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./IndieDetail.css";

const IndieDetail = (props) => {
  const [error, setError] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [indieDetail, setIndieDetail] = useState({
    name: "",
    imageUrl: "",
    description: {
      company: "",
      song: "",
      birth: "",
      content: "",
    },
    sns: {
      youtube: "",
      instagram: "",
      soundcloud: "",
    },
    like: 0,
  });

  useEffect(() => {
    const getSearchedIndieInformation = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/indie/${props.name}`
          /* ,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: "61827b5439d7cd188c3f8dd2",
            }),
          } */
        );

        const responseData = await response.json();

        setIndieDetail({
          name: responseData.name,
          imageUrl: responseData.imageUrl,
          description: {
            company: responseData.company,
            song: responseData.song,
            birth: responseData.birth,
            content: responseData.content,
          },
          sns: {
            youtube: responseData.youtube,
            instagram: responseData.instagram,
            soundcloud: responseData.soundcloud,
          },
          like: responseData.like,
        });

        if (!response.ok) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err);
        setError(err.message || "Something went wrong, please try again");
      }
    };
    getSearchedIndieInformation();
  }, []);

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
                {indieDetail.like}
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
              <p>소속사 : &nbsp;</p>
              {indieDetail.description.company}
            </div>
            <br />
            <div className="detail-desc__contents">
              <p>대표곡 : &nbsp;</p>
              {indieDetail.description.song}
            </div>
            <br />
            <div className="detail-desc__contents">
              <p>생일 : &nbsp;</p>
              {indieDetail.description.birth}
            </div>
            <br />
            {indieDetail.description.content}
          </span>
          <div className="detail-container__footer">
            <div className="detail-container__sns">
              <a href={`${indieDetail.sns.soundcloud}`} target="_blank">
                <div className="detail-sns__soundcloud" />
              </a>
              <a href={`${indieDetail.sns.instagram}`} target="_blank">
                <div className="detail-sns__instagram" />
              </a>
              <a href={`${indieDetail.sns.youtube}`} target="_blank">
                <div className="detail-sns__youtube" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndieDetail;
