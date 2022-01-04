import React from "react";

import "./Main.css";

const Main = () => {
  const style = {
    background: `url(${process.env.REACT_APP_BACKEND_URL}/images/main_back.jpg) no-repeat center center/cover, rgba(0, 0, 0, 0.5)`,
  };

  return (
    <div className="main__container" style={style}>
      <h1 className="main__mainTitle"> Oh, My Indie </h1>
      <h2 className="main__subTitle"> 당신의 'Indie'는 누구인가요?</h2>
    </div>
  );
};

export default Main;
