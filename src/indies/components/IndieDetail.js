import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/components/context/auth-context";
import ErrorModal from "../../shared/components/error/ErrorModal";

import "./IndieDetail.css";

const IndieDetail = (props) => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMsg, setErrrorMsg] = useState();
  const [likeClicked, setLikeClicked] = useState(false);
  const [indieDetail, setIndieDetail] = useState({
    name: "",
    image: "",
    company: "",
    song: "",
    birth: "",
    description: "",
    youtube: "",
    instagram: "",
    soundcloud: "",
    like: 0,
    likeClicked: false,
  });

  const errorModalCloseHandler = () => {
    setError(false);
  };

  useEffect(() => {
    const getSearchedIndieInformation = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/indie/${props.name}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        const responseData = await response.json();

        setIndieDetail({
          name: responseData.name,
          image: responseData.image,
          company: responseData.company,
          song: responseData.song,
          birth: responseData.birth,
          description: responseData.description,
          youtube: responseData.youtube,
          instagram: responseData.instagram,
          soundcloud: responseData.soundcloud,
          like: responseData.like,
          likeClicked: responseData.likeClicked,
        });

        if (!response.ok) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err.message);
        setErrrorMsg(err.message);
        setError(true);
      }
    };
    getSearchedIndieInformation();
    setLikeClicked(false);
  }, [likeClicked]);

  const heartClickHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/indie/${props.name}/like`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setLikeClicked(true);
    } catch (err) {
      console.log(err);
      setErrrorMsg(err.message);
      setError(true);
    }
  };

  return (
    <div className="detail">
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      <div className="detail-container__body">
        <div className="detail-container__left">
          <div className="detail-img">
            <img
              src={`http://localhost:5000/${indieDetail.image}`}
              alt={indieDetail.name}
            />
          </div>
          <div className="detail-favorite">
            <div className="detail-like__container" onClick={heartClickHandler}>
              <div
                className={`${
                  !indieDetail.likeClicked
                    ? "detail-like__image"
                    : "detail-like__image-active"
                }`}
              />
              <div
                className={`${
                  !indieDetail.likeClicked
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
              {indieDetail.company}
            </div>
            <br />
            <div className="detail-desc__contents">
              <p>대표곡 : &nbsp;</p>
              {indieDetail.song}
            </div>
            <br />
            <div className="detail-desc__contents">
              <p>생일 : &nbsp;</p>
              {indieDetail.birth}
            </div>
            <br />
            {indieDetail.description}
          </span>
          <div className="detail-container__footer">
            <div className="detail-container__sns">
              <a href={`${indieDetail.soundcloud}`} target="_blank">
                <div className="detail-sns__soundcloud" />
              </a>
              <a href={`${indieDetail.instagram}`} target="_blank">
                <div className="detail-sns__instagram" />
              </a>
              <a href={`${indieDetail.youtube}`} target="_blank">
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
