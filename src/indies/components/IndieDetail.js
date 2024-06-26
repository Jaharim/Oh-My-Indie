import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/components/context/auth-context';
import ErrorModal from '../../shared/components/error/ErrorModal';

import './IndieDetail.css';

const IndieDetail = (props) => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMsg, setErrrorMsg] = useState();
  const [likeClicked, setLikeClicked] = useState(false);
  const [indieDetail, setIndieDetail] = useState({
    name: '',
    image: '',
    company: '',
    song: '',
    birth: '',
    description: '',
    youtube: '',
    instagram: '',
    soundcloud: '',
    like: 0,
    likeClicked: false,
  });

  const bringImageFromServer = (imageName) => {
    return {
      backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL}/images/${imageName}.png")`,
    };
  };

  const errorModalCloseHandler = () => {
    setError(false);
  };

  const storedData = JSON.parse(localStorage.getItem('userData'));
  useEffect(() => {
    const getSearchedIndieInformation = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/indie/${props.name}`,
          {
            headers: {
              Authorization: `Bearer ${storedData.token}`,
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
        console.log(err);
        setErrrorMsg(err.message);
        setError(true);
      }
    };
    getSearchedIndieInformation();
    setLikeClicked(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likeClicked]);

  const heartClickHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/indie/${props.name}/like`,
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
      setErrrorMsg(err.message);
      setError(true);
    }
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal errorMsg={errorMsg} onClose={errorModalCloseHandler} />
      )}
      <div className='detail'>
        <div className='detail-container__body'>
          <div className='detail-container__left'>
            <div className='detail-img'>
              <img
                className='detail-img-content'
                src={
                  indieDetail.image
                    ? `${process.env.REACT_APP_BACKEND_URL}/${indieDetail.image}`
                    : '/icon-img.svg'
                }
                alt={indieDetail.name}
              />
            </div>
            <div className='detail-favorite'>
              <div
                className='detail-like__container'
                onClick={heartClickHandler}
              >
                <div
                  className='detail-like__image'
                  style={
                    !indieDetail.likeClicked
                      ? bringImageFromServer('heart')
                      : bringImageFromServer('heart_active')
                  }
                />
                <div
                  className={`${
                    !indieDetail.likeClicked
                      ? 'detail-like__number'
                      : 'detail-like__number-active'
                  }`}
                >
                  {indieDetail.like}
                </div>
              </div>
              <div className='detail-container__support'>
                <Link
                  className='detail-support'
                  to={`/indie/${props.name}/support`}
                  exact='true'
                >
                  Indie 에게,
                </Link>
              </div>
            </div>
          </div>
          <div className='detail-container__right'>
            <span className='detail-desc'>
              <div className='detail-desc__contents'>
                <p>소속사 : &nbsp;</p>
                {indieDetail.company}
              </div>
              <br />
              <div className='detail-desc__contents'>
                <p>대표곡 : &nbsp;</p>
                {indieDetail.song}
              </div>
              <br />
              <div className='detail-desc__contents'>
                <p>생일 : &nbsp;</p>
                {indieDetail.birth}
              </div>
              <br />
              {indieDetail.description}
            </span>
            <div className='detail-container__footer'>
              <div className='detail-container__sns'>
                <a
                  href={`${indieDetail.soundcloud}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div
                    className='detail-sns__soundcloud'
                    style={bringImageFromServer('soundcloud')}
                  />
                </a>
                <a
                  href={`${indieDetail.instagram}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div
                    className='detail-sns__instagram'
                    style={bringImageFromServer('instagram')}
                  />
                </a>
                <a
                  href={`${indieDetail.youtube}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div
                    className='detail-sns__youtube'
                    style={bringImageFromServer('youtube')}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(IndieDetail);
