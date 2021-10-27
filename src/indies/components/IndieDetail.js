import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const IndieDetail = (props) => {
  return (
    <Fragment>
      <h1>Image</h1>
      <h1>{props.name}</h1>
      <h1>Description</h1>
      <h1>Like, Bookmark</h1>
      <Link to={`/indie/${props.name}/support`} exact>
        {props.name} 에게,
      </Link>
      <h1>SNS</h1>
    </Fragment>
  );
};

export default IndieDetail;
