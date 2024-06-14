import React from 'react';

import './RandomIndie.css';

const RandomIndie = (props) => {
  // Random 으로 DB에서 Indie 한 명을 가져오는 경우
  const likeImagebackground = {
    backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL}/images/heart_active.png")`,
  };

  return (
    <div className='searched-container' onClick={props.onClick}>
      <img
        className='searched-image'
        src={
          props.image
            ? `${process.env.REACT_APP_BACKEND_URL}/${props.image}`
            : '/icon-img.svg'
        }
        alt='random-img'
      />
      <span className='searched-name'>{props.name}</span>
      <div className='searched-like__container'>
        <div className='searched-like__image' style={likeImagebackground} />
        <div className='searched-like__number'>{props.likeNumber}</div>
      </div>
    </div>
  );
};

export default RandomIndie;
