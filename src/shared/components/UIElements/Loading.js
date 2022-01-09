import React from "react";

import "./Loading.css";
import LoadingSpinner from "../../../media/loading.png";

const Loading = (props) => {
  let firstDivClassName;
  let secondDivClassName;
  let imgClassName;

  if (props.page) {
    firstDivClassName = "page-loading";
    secondDivClassName = "page-loading-spinner__container";
    imgClassName = "page-loading-spinner";
  } else {
    firstDivClassName = "loading";
    secondDivClassName = "loading-spinner__container";
    imgClassName = "loading-spinner";
  }

  return (
    <div className={firstDivClassName}>
      <div className={secondDivClassName}>
        <img className={imgClassName} src={LoadingSpinner} />
      </div>
    </div>
  );
};

export default Loading;
